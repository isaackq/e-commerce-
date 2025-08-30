import { Admin } from '@domain/entities/User/Admin';
import { UserResponseDto } from './user.response.dto';

export class AdminResponseDto extends UserResponseDto {
  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    birthday: Date,
    role: string,
    city: string,
    countryCode: string,
  ) {
    super(id, firstName, lastName, email, birthday, role, city, countryCode);
  }

  static createFromEntity(admin: Admin): AdminResponseDto {
    const adminResponse = new AdminResponseDto(
      admin.id,
      admin.firstName,
      admin.lastName,
      admin.email,
      admin.birthday.value,
      admin.getRole(),
      admin.city,
      admin.countryCode,
    );
    return adminResponse;
  }
}
