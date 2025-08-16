import { RolesEnum } from 'src/domain/enums/role.enum';
import { User } from './User';
import { Cart } from '../Cart';
import { Favorites } from '../Favorites';

export class Customer extends User {
  cart: Cart;
  favorites: Favorites;

  getRole(): RolesEnum {
    return RolesEnum.Customer;
  }
}
