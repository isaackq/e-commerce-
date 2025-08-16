import { TargetCustomerResolver } from '@application/user/providers/target-customer-resolver.provider';
import { UserTransformer } from '@application/user/transformer/user.transformer';
import { GetUserByIdUsecase } from '@application/user/usecase/get-user-by-id.usecase';
import { LoginUseCase } from '@application/user/usecase/login.usecase';
import { RegisterAdminUsecase } from '@application/user/usecase/register-admin.usecase';
import { RegisterCustomerUseCase } from '@application/user/usecase/register-customer.usecase';
import { RegesterSellerUsecase } from '@application/user/usecase/register-seller.usecase copy';
import { UpdateUserInformationUseCase } from '@application/user/usecase/update-user-information.usecase';
import { Favorites } from '@domain/entities/Favorites';
import jwtConfig from '@infrastructure/config/jwt.config';
import { AuthController } from '@infrastructure/controllers/auth.controller';
import { UserController } from '@infrastructure/controllers/User.controller';
import { BcryptHashingProvider } from '@infrastructure/providers/bcrypt.hashing.provider';
import { TokenGenerator } from '@infrastructure/providers/token-generator.provider';
import { userRepository } from '@infrastructure/repositories/user.repository';
import { Cart, CartSchema } from '@infrastructure/schemas/cart.schema';
import { FavoritesSchame } from '@infrastructure/schemas/favorites.schema';
import { User, UserSchema } from '@infrastructure/schemas/user.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: Favorites.name, schema: FavoritesSchame },
      { name: Cart.name, schema: CartSchema },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
          signOptions: configService.get('jwt.signOptions'),
        };
      },
      global: true,
    }),
  ],
  providers: [
    {
      provide: 'userRepository',
      useClass: userRepository,
    },
    { provide: 'HashingProvider', useClass: BcryptHashingProvider },
    { provide: 'TokenGenerator', useClass: TokenGenerator },
    RegisterCustomerUseCase,
    UserTransformer,
    userRepository,
    LoginUseCase,
    RegesterSellerUsecase,
    RegisterAdminUsecase,
    TargetCustomerResolver,
    GetUserByIdUsecase,
    UpdateUserInformationUseCase,
  ],
  exports: [
    {
      provide: 'userRepository',
      useClass: userRepository,
    },
    TargetCustomerResolver,
  ],
  controllers: [UserController, AuthController],
})
export class UserModule {}
