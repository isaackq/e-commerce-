import { UserRequestDto } from './user.request.dto';

export class SellerRequestDto extends UserRequestDto {
  constructor(firstName: string, lastName: string, email: string, birthday: Date | null, city: string) {
    super(firstName, lastName, email, birthday, city);
  }
}
