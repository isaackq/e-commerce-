import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { ProductFilterDto } from './product.filter.dto';
import { IsOptional, IsString } from 'class-validator';

class QDto {
  @ApiProperty({
    example: 'Rose',
    description: 'Search term to look for in product name/description',
    required: false,
  })
  @IsOptional()
  @IsString()
  q?: string;
}

export class ProductSearchDto extends IntersectionType(ProductFilterDto, QDto) {}
