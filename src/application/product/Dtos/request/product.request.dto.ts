import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductRequestDto {
  @ApiProperty({ example: 'Rose Bouquet', description: 'Name of the product', required: true, type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'A beautiful bouquet of roses',
    description: 'Description of the product',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'https://example.com/rose-bouquet.jpg',
    description: 'Image URL of the product',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    example: 10,
    description: 'Stock quantity of the product',
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    example: '19.99',
    description: 'Price of the product',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: '60d21b4667d0d8992e610c85',
    description: 'ID of the product category',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsMongoId()
  category: string;
}
