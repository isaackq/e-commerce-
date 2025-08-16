import { PaginationDto } from '@application/pagination/Dto/request/pagination-query.dto';
import { ProductStatusEnum } from '@domain/enums/product-status.enum';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsIn } from 'class-validator';

class ProductBaseDto {
  @ApiProperty({
    example: 'flowers',
    description: 'The category of the product',
    required: false,
    enum: ['flowers', 'plants', 'gifts'],
  })
  @IsOptional()
  @IsIn(['flowers', 'plants', 'gifts'])
  category?: 'flowers' | 'plants' | 'gifts';

  @ApiProperty({
    example: ProductStatusEnum.AVAILABLE,
    description: 'The status of the product',
    required: false,
    enum: ProductStatusEnum,
  })
  @IsOptional()
  @IsIn(Object.values(ProductStatusEnum))
  status: ProductStatusEnum;
}

export class ProductFilterDto extends IntersectionType(ProductBaseDto, PaginationDto) {}
