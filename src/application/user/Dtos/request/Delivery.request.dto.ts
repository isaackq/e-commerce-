import { UserRequestDto } from './user.request.dto';

export class DeliveryRequestDto extends UserRequestDto {
  constructor(firstName: string, lastName: string, email: string, birthday: Date | null, city: string) {
    super(firstName, lastName, email, birthday, city);
  }
} //when creating new customer, new cart and favorites added to hem
