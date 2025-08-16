import { User } from '@domain/entities/User/User';
import { UserResponseDto } from '../Dtos/response/user.response.dto';
import { RolesEnum } from '@domain/enums/role.enum';
import { Customer } from '@domain/entities/User/Customer';
import { SellerResponseDto } from '../Dtos/response/seller.response.dot';
import { CustomerResponseDto } from '../Dtos/response/customer.response.dto';
import { AdminResponseDto } from '../Dtos/response/admin.response.dtp';
import { Admin } from '@domain/entities/User/Admin';
import { Seller } from '@domain/entities/User/Seller';
// import { Delivery } from '@domain/entities/User/Delivery';

export class UserResponseFactory {
  static createFromEntity(user: User): UserResponseDto {
    let userResponse: UserResponseDto;
    if (user.getRole() === RolesEnum.Customer) {
      userResponse = CustomerResponseDto.createFromEntity(user as Customer);
    }
    if (user.getRole() === RolesEnum.Seller) {
      userResponse = SellerResponseDto.createFromEntity(user as Seller);
    }
    if (user.getRole() === RolesEnum.Admin) {
      userResponse = AdminResponseDto.createFromEntity(user as Admin);
    }
    // if (user.getRole() === RolesEnum.Delivery) {
    //   userResponse =DeliveryResponseDto.createFromEntity(user as Delivery);
    // }

    return userResponse;
  }
}
