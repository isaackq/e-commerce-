import { RolesEnum } from 'src/domain/enums/role.enum';
import { User } from './User';

export class Seller extends User {
  getRole(): RolesEnum {
    return RolesEnum.Seller;
  }
}
