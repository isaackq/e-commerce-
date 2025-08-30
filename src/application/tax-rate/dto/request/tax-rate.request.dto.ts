import { IsCountryCode } from '@infrastructure/validators/is-country-code.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsBoolean, IsMongoId, Length, Min, Max, IsNotEmpty } from 'class-validator';

export class TaxRateRequestDto {
  @ApiProperty({
    type: String,
    description: 'Country code in ISO 3166-1 alpha-2 format',
    example: 'US',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @IsCountryCode({}, { message: 'Invalid countryCode (ISO alpha-2 required)' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase().trim() : value))
  countryCode: string;

  @ApiProperty({
    type: String,
    description: 'Region or state within the country (optional)',
    example: 'FLorida',
    required: false,
  })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiProperty({
    type: Number,
    description: 'Tax rate as a percentage (0-100)',
    example: 7.5,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  rate: number;

  @ApiProperty({
    type: String,
    description: 'ID of the tax class',
    example: '60d5ec49f1c2b14b2c8b4567',
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  taxClass: string;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the tax rate is active',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
