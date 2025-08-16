import { ProductCategory } from '@domain/entities/ProductCategory';
import { ProductCategoryEnum } from '@domain/enums/products.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ProductCategoryResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the product category',
    example: '1234567890abcdef',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Type of the product category',
    example: 'FLOWERS',
    enum: ProductCategoryEnum,
  })
  category: ProductCategoryEnum;

  constructor(id: string, type: ProductCategoryEnum) {
    this.id = id;
    this.category = type;
  }

  static createFromEntity(productCategory: ProductCategory): ProductCategoryResponseDto {
    const productCategoryResponse = new ProductCategoryResponseDto(productCategory.id, productCategory.category);
    return productCategoryResponse;
  }
}
