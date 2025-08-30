import { User } from '@domain/entities/User/User';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: '1234567890abcdef',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    type: String,
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Birthday of the user',
    example: '1990-01-01',
    type: Date,
  })
  birthday: Date;

  @ApiProperty({
    description: 'Role of the user',
    example: 'admin',
    type: String,
  })
  role: string;

  @ApiProperty({
    description: 'City of the user',
    example: 'Gaza',
    type: String,
  })
  city: string;

  @ApiProperty({
    type: String,
    description: 'Country code in ISO 3166-1 alpha-2 format',
    example: 'US',
    required: true,
  })
  countryCode: string;

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
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthday = birthday;
    this.role = role;
    this.city = city;
    this.countryCode = countryCode;
  }

  static createFromEntity(user: User): UserResponseDto {
    const userResponse = new UserResponseDto(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.birthday.value,
      user.getRole(),
      user.city,
      user.countryCode,
    );
    return userResponse;
  }
}
