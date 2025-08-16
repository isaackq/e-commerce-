import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

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

  constructor(firstName: string, lastName: string, email: string, birthday: Date | null, city: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthday = birthday;
    this.city = city;
  }
}
