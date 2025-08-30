import { IsCountryCode } from '@infrastructure/validators/is-country-code.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from 'class-validator';

export class UserRequestDto {
  @ApiProperty({
    example: 'isaac',
    description: 'first name of the user',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'kamel',
    description: 'last name of the user',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'isaac@gmail.com',
    description: 'email of the user',
    required: true,
    type: String,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the User',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: '1999-12-13',
    description: 'The birthday of the User',
    required: true,
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @ApiProperty({
    example: 'Gaza',
    description: 'The country address of the user',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    type: String,
    description: 'Country code in ISO 3166-1 alpha-2 format',
    example: 'US',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @IsCountryCode({}, { message: 'Invalid countryCode (ISO alpha-2 required)' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase().trim() : value))
  countryCode: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    birthday: Date | null,
    city: string,
    countryCode: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthday = birthday;
    this.city = city;
    this.countryCode = countryCode;
  }
}
