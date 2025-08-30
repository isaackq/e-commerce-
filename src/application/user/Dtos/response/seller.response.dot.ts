import { UserResponseDto } from './user.response.dto';
import { Seller } from '@domain/entities/User/Seller';

export class SellerResponseDto extends UserResponseDto {
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

  static createFromEntity(seller: Seller): SellerResponseDto {
    const sellerResponse = new SellerResponseDto(
      seller.id,
      seller.firstName,
      seller.lastName,
      seller.email,
      seller.birthday.value,
      seller.getRole(),
      seller.city,
      seller.countryCode,
    );
    return sellerResponse;
  }
}
