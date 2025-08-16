import { User } from '@domain/entities/User/User';
import { UserRequestDto } from '../Dtos/request/user.request.dto';
import userFactory from '@domain/factories/user.factory';
import { RolesEnum } from '@domain/enums/role.enum';
import { Birthday } from '@domain/ObjectValues/Birthday';
import { Customer } from '@domain/entities/User/Customer';
import { Cart } from '@domain/entities/Cart';
import { Favorites } from '@domain/entities/Favorites';
import { CustomerRequestDto } from '../Dtos/request/customer.request.dto';
import { AdminRequestDto } from '../Dtos/request/admin.request.dto';
import { SellerRequestDto } from '../Dtos/request/seller.request.dto';
import { Injectable } from '@nestjs/common';
import { Admin } from '@domain/entities/User/Admin';
import { Seller } from '@domain/entities/User/Seller';
import { Delivery } from '@domain/entities/User/Delivery';
import { DeliveryRequestDto } from '../Dtos/request/Delivery.request.dto';
import { UpdateUserInfoDto } from '../Dtos/request/update-user-info.request.dto';

@Injectable()
export class UserTransformer {
  toEntity(userRequestDto: UserRequestDto): User {
    const role =
      userRequestDto instanceof CustomerRequestDto
        ? RolesEnum.Customer
        : userRequestDto instanceof AdminRequestDto
          ? RolesEnum.Admin
          : userRequestDto instanceof SellerRequestDto
            ? RolesEnum.Seller
            : RolesEnum.Delivery;

    const user = userFactory.create(role);

    user.firstName = userRequestDto.firstName;
    user.lastName = userRequestDto.lastName;
    user.email = userRequestDto.email;
    user.password = userRequestDto.password;
    user.birthday = new Birthday(userRequestDto.birthday);
    user.city = userRequestDto.city;
    user.isActive = true;

    if (user instanceof Customer && userRequestDto instanceof CustomerRequestDto) {
      user.cart = new Cart();
      user.favorites = new Favorites();
    }

    if (user instanceof Admin && userRequestDto instanceof AdminRequestDto) {
    }

    if (user instanceof Seller && userRequestDto instanceof SellerRequestDto) {
      // user.products = [];
    }

    if (user instanceof Delivery && userRequestDto instanceof DeliveryRequestDto) {
    }
    return user;
  }

  updateEntity(updateUserInfoDto: UpdateUserInfoDto, user: User): User {
    if (updateUserInfoDto.firstName) user.firstName = updateUserInfoDto.firstName;
    if (updateUserInfoDto.lastName) user.lastName = updateUserInfoDto.lastName;
    if (updateUserInfoDto.email) user.email = updateUserInfoDto.email;
    if (updateUserInfoDto.birthday) user.birthday = new Birthday(updateUserInfoDto.birthday);
    if (updateUserInfoDto.city) user.city = updateUserInfoDto.city;

    return user;
  }
}
