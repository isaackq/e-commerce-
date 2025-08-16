import { ProductResponseDto } from '@application/product/Dtos/response/product.response.dto';
import { Favorites } from '@domain/entities/Favorites';
import { ApiProperty } from '@nestjs/swagger';

export class FavoritesResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the favorites',
    example: '1234567890abcdef',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'List of products in the favorites',
    type: [ProductResponseDto],
  })
  products: ProductResponseDto[];

  constructor(id: string, products: ProductResponseDto[]) {
    this.id = id;
    this.products = products;
  }

  static createFromEntity(favorites: Favorites): FavoritesResponseDto {
    let favoritesResponse: FavoritesResponseDto;
    if (favorites.Products && favorites.Products.length > 0) {
      favoritesResponse = new FavoritesResponseDto(
        favorites.id,
        favorites.Products.map((product) => ProductResponseDto.createFromEntity(product)),
      );
    } else {
      favoritesResponse = new FavoritesResponseDto(favorites.id, []);
    }
    return favoritesResponse;
  }
}
