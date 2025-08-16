import { ProductCategoryEnum } from '@domain/enums/products.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class ProductCategoryRequestDto {
  @ApiProperty({
    description: 'Type of the product category',
    example: 'flowers',
    enum: ProductCategoryEnum,
    required: true,
  })
  @IsEnum(ProductCategoryEnum)
  category: ProductCategoryEnum;
}
