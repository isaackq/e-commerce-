import { PaginationDto } from '@application/pagination/Dto/request/pagination-query.dto';
import { ProductStatusEnum } from '@domain/enums/product-status.enum';
import { ProductCategoryEnum } from '@domain/enums/products.enum';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsIn, IsString } from 'class-validator';

class ProductBaseDto {
  @ApiProperty({
    example: 'flowers',
    description: 'The category of the product',
    required: false,
    enum: ProductCategoryEnum,
  })
  @IsOptional()
  @IsIn(Object.values(ProductCategoryEnum))
  category?: ProductCategoryEnum;

  @ApiProperty({
    example: ProductStatusEnum.AVAILABLE,
    description: 'The status of the product',
    required: false,
    enum: ProductStatusEnum,
  })
  @IsOptional()
  @IsIn(Object.values(ProductStatusEnum))
  status?: ProductStatusEnum;
}

export class ProductFilterDto extends IntersectionType(ProductBaseDto, PaginationDto) {}
