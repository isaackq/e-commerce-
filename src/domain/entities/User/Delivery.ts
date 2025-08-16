import { RolesEnum } from 'src/domain/enums/role.enum';
import { User } from './User';

export class Delivery extends User {
  getRole(): RolesEnum {
    return RolesEnum.Delivery;
  }
}
