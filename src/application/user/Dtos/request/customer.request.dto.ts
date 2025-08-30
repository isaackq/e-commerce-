import { UserRequestDto } from './user.request.dto';

export class CustomerRequestDto extends UserRequestDto {
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    birthday: Date | null,
    city: string,
    countryCode: string,
  ) {
    super(firstName, lastName, email, birthday, city, countryCode);
  }
} //when creating new customer, new cart and favorites added to hem
