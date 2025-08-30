import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaxClassRequestDto {
  @ApiProperty({ type: String, description: 'The name of the tax class', example: 'STANDARD', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'The description of the tax class',
    example: 'Standard VAT for products',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}
