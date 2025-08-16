import { Customer } from '@domain/entities/User/Customer';
import userFactory from '@domain/factories/user.factory';
import { Birthday } from '@domain/ObjectValues/Birthday';
import { UserDocument } from '@infrastructure/schemas/user.schema';
import { CartMapper } from './cart.mapper';
import { FavoritesMapper } from './favorites.mapper';
import { User } from '@domain/entities/User/User';
import { RolesEnum } from '@domain/enums/role.enum';

export class UserMapper {
  static map(userDocument: UserDocument | string): User {
    if (typeof userDocument === 'string') {
      const user = userFactory.create(RolesEnum.Seller);
      user.id = userDocument;
      return user;
    }
    const user = userFactory.create(userDocument.role);

    user.id = userDocument.id;
    user.firstName = userDocument.firstName;
    user.lastName = userDocument.lastName;
    user.email = userDocument.email;
    user.password = userDocument.password;
    user.birthday = new Birthday(userDocument.birthday);
    user.city = userDocument.city;
    user.isActive = userDocument.isActive;

    if (user instanceof Customer) {
      this.customerMapper(userDocument, user);
    }
    return user;
  }

  private static customerMapper(userDocument: UserDocument, customer: Customer) {
    customer.cart = CartMapper.map(userDocument.cart as any);
    customer.favorites = FavoritesMapper.map(userDocument.favorites as any);
  }
}
