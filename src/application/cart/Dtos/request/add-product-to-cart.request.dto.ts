import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class AddProductToCartRequestDto {
  @ApiProperty({ description: 'ID of the product to add to cart', example: '1234567890abcdef' })
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Quantity of the product', example: 2, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Additional notes for the product', required: false, example: 'Gift wrap this item' })
  @IsOptional()
  @IsString()
  notes?: string;
}
