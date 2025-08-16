import { RolesEnum } from 'src/domain/enums/role.enum';
import { User } from './User';

export class Admin extends User {
  getRole(): RolesEnum {
    return RolesEnum.Admin;
  }
}
