import { RolesEnum } from '../../enums/role.enum';
import { Birthday } from '../../ObjectValues/Birthday';

export abstract class User {
  public id?: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public birthday: Birthday;
  public city: string;
  public isActive: boolean;

  abstract getRole(): RolesEnum;
}
