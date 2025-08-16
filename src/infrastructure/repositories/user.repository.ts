import { HashingProviderInterface } from '@application/user/auth/hashing.provider.interface';
import { User } from '@domain/entities/User/User';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { RegisterRepository } from '@infrastructure/decorators/register-repository.decorator';
import { UserMapper } from '@infrastructure/mappers/user.maper';
import { Cart, CartDocument } from '@infrastructure/schemas/cart.schema';
import { Favorites, FavoritesDocument } from '@infrastructure/schemas/favorites.schema';
import { UserDocument, User as UserSchema } from '@infrastructure/schemas/user.schema';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@RegisterRepository('User')
@Injectable()
export class userRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    @InjectModel(Favorites.name) private readonly favoritModel: Model<FavoritesDocument>,

    @Inject('HashingProvider')
    private readonly hashprovider: HashingProviderInterface,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async save(user: User): Promise<User> {
    const existingUsers = await this.userModel
      .find({
        email: user.email,
      })
      .exec();

    if (existingUsers.length > 0) {
      throw new ConflictException('A user with email and/or mobileNumber already exists.');
    }
    const password = await this.hashprovider.hash(user.password);

    const userData = {
      ...user,
      role: user.getRole(),
      password: password,
      birthday: user.birthday.value,
    };

    const userDocument = await this.userModel.create(userData);
    return UserMapper.map(userDocument);
  }

  async createCustomer(user: User): Promise<User> {
    const existingUsers = await this.userModel
      .find({
        email: user.email,
      })
      .exec();

    if (existingUsers.length > 0) {
      throw new ConflictException('A user with email and/or mobileNumber already exists.');
    }
    const encryptedPassword = await this.hashprovider.hash(user.password);
    const session = await this.connection.startSession();
    try {
      await session.startTransaction();
      const cart = await this.cartModel.create([{}], { session });

      const favorites = await this.favoritModel.create([{}], { session });

      const [userDocument] = await this.userModel.create(
        [
          {
            ...user,
            role: user.getRole(),
            password: encryptedPassword,
            birthday: user.birthday.value,
            cart: cart[0].id,
            favorites: favorites[0].id,
          },
        ],
        { session },
      );

      await session.commitTransaction();
      return UserMapper.map(userDocument);
    } catch (error) {
      await session.abortTransaction();
      console.error('Error creating user:', error);
    } finally {
      await session.endSession();
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      return null;
    }
    return UserMapper.map(user);
  }
  async findOne(id: string): Promise<User> {
    const userDocument = await this.userModel.findById(id).exec();
    if (!userDocument) {
      return null;
    }
    // let populatFeilds;
    // if (userDocument.role === RolesEnum.Customer) {
    //   populatFeilds = 'cart favorites';
    // }
    // console.log(populatFeilds);

    return UserMapper.map(userDocument);
  }

  async updateOne(user: User, hasEmailUpdate: boolean): Promise<User> {
    if (hasEmailUpdate) {
      await this.assertEmailIsUnique(user.email, user.id);
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(user.id, { ...user, birthday: user.birthday.value }, { new: true })
      .exec();
    if (!updatedUser) {
      return null;
    }
    return UserMapper.map(updatedUser);
  }

  private async assertEmailIsUnique(email: string, excludeUserId: string): Promise<void> {
    const conflict = await this.userModel.findOne({
      _id: { $ne: excludeUserId },
      email: email,
    });

    if (conflict) {
      throw new ConflictException('Email already used by another user.');
    }
  }
  //   addToCart(Product: Product | Product[], userId: string); //cuurent  user
  //   addToFavorites(Product: Product | Product[], userId: string); //cuurent  user
}
