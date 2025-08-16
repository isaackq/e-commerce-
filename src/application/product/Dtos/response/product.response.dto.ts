import { ProductCategoryResponseDto } from '@application/productCategory/Dtos/response/product-category.response.dto';
import { AdminResponseDto } from '@application/user/Dtos/response/admin.response.dtp';
import { SellerResponseDto } from '@application/user/Dtos/response/seller.response.dot';
import { UserResponseDto } from '@application/user/Dtos/response/user.response.dto';
import { Product } from '@domain/entities/Product';
import { ProductStatusEnum } from '@domain/enums/product-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the product',
    example: '1234567890abcdef',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Name of the flower product',
    example: 'Red Rose Bouquet',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Description of the flower product',
    example: 'A beautiful bouquet of fresh red roses, perfect for any occasion.',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'URL of the flower product image',
    example: 'https://example.com/images/flowers-bouquet.jpg',
    type: String,
  })
  imageUrl?: string;

  @ApiProperty({
    description: 'Number of items in stock',
    example: 150,
    type: Number,
  })
  stock: number;

  @ApiProperty({
    description: 'Price of the product',
    example: 29.99,
    type: Number,
  })
  price: number;

  @ApiProperty({
    description: 'status of the product',
    example: ProductStatusEnum.ACTIVE,
    enum: ProductStatusEnum,
  })
  status: ProductStatusEnum;

  @ApiProperty({
    description: 'Category of the product',
    type: ProductCategoryResponseDto,
  })
  category: ProductCategoryResponseDto;

  @ApiProperty({
    description: 'Seller of the product',
    type: UserResponseDto,
    required: false,
  })
  seller?: SellerResponseDto | string;

  @ApiProperty({
    description: 'Admin who approved the product',
    type: UserResponseDto,
    required: false,
  })
  admin?: AdminResponseDto | string;

  static createFromEntity(product: Product): ProductResponseDto {
    const productResponse = new ProductResponseDto();
    productResponse.id = product.id;
    productResponse.name = product.name;
    productResponse.description = product.description;
    productResponse.imageUrl = product.imageUrl;
    productResponse.stock = product.stock;
    productResponse.price = product.price;
    productResponse.status = product.status;
    productResponse.category = ProductCategoryResponseDto.createFromEntity(product.category);

    productResponse.seller =
      typeof product.seller?.email === 'string'
        ? SellerResponseDto.createFromEntity(product.seller)
        : product.seller?.id;
    productResponse.admin =
      typeof product.admin?.email === 'string' ? AdminResponseDto.createFromEntity(product.admin) : product.admin?.id;
    return productResponse;
  }
}
