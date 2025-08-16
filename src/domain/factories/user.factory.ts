import { Admin } from '../entities/User/Admin';
import { Customer } from '../entities/User/Customer';
import { Delivery } from '../entities/User/Delivery';
import { Seller } from '../entities/User/Seller';
import { RolesEnum } from '../enums/role.enum';

export default class userFactory {
  static create(role: RolesEnum) {
    if (role == RolesEnum.Admin) {
      return new Admin();
    }
    if (role == RolesEnum.Customer) {
      return new Customer();
    }
    if (role == RolesEnum.Delivery) {
      return new Delivery();
    }
    if (role == RolesEnum.Seller) {
      return new Seller();
    }
  }
}
