import { CartResponseDto } from '@application/cart/Dtos/response/cart.response.dto';
import { UserResponseDto } from './user.response.dto';
import { Customer } from '@domain/entities/User/Customer';
import { FavoritesResponseDto } from '@application/favorites/Dtos/response/favorites.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto extends UserResponseDto {
  @ApiProperty({
    description: 'Cart details of the customer',
    type: CartResponseDto,
  })
  cart: CartResponseDto;

  @ApiProperty({
    description: 'Favorites details of the customer',
    type: FavoritesResponseDto,
  })
  favorites: FavoritesResponseDto;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    birthday: Date,
    role: string,
    city: string,
  ) {
    super(id, firstName, lastName, email, birthday, role, city);
  }

  static createFromEntity(customer: Customer): CustomerResponseDto {
    const customerResponse = new CustomerResponseDto(
      customer.id,
      customer.firstName,
      customer.lastName,
      customer.email,
      customer.birthday.value,
      customer.getRole(),
      customer.city,
    );
    customerResponse.cart = CartResponseDto.createFromEntity(customer.cart);
    customerResponse.favorites = FavoritesResponseDto.createFromEntity(customer.favorites);
    return customerResponse;
  }
}
