import { IsCountryCode } from '@infrastructure/validators/is-country-code.validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsIn, IsMongoId, IsOptional, IsString, Length } from 'class-validator';

export class TaxRateFilterDto {
  @ApiProperty({
    type: String,
    description: 'ID of the tax class',
    example: '60d5ec49f1c2b14b2c8b4567',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  taxClass?: string;

  @ApiProperty({
    type: String,
    description: 'Country code in ISO 3166-1 alpha-2 format',
    example: 'US',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(2, 2)
  @IsCountryCode({}, { message: 'Invalid countryCode (ISO alpha-2 required)' })
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase().trim() : value))
  countryCode?: string;

  // @ApiProperty({
  //   type: Boolean,
  //   description: 'Indicates if the tax rate is active',
  //   example: true,
  //   required: false,
  // })
  // @IsOptional()
  // @IsBoolean()
  // @Type(() => Boolean)
  // isActive?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Indicates if the tax rate is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    // enableImplicitConversion: false,  to not convert 'false' to true
    // Handle arrays (e.g. multiple query params)
    const v = Array.isArray(value) ? value[0] : value;

    // Normalize value for checking
    const val = String(v).toLowerCase();

    if (val === 'true' || val === '1') return true;
    if (val === 'false' || val === '0') return false;

    return undefined;
  })
  isActive?: boolean;
}
