import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from './product.response.dto';

export class CreatedProductResponseDto {
  @ApiProperty({
    description: 'A human-readable message about the request status',
    example: 'Product added successfully and is pending approval by admin',
    type: String,
  })
  message: string;

  @ApiProperty({
    description: 'The product details',
    type: ProductResponseDto,
  })
  data: ProductResponseDto;
}
