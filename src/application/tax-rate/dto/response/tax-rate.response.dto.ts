import { TaxClassResponseDto } from '@application/tax-class/dto/response/tax-class.response.dto';
import { TaxRate } from '@domain/entities/TaxRate';
import { ApiProperty } from '@nestjs/swagger';

export class TaxRateResponseDto {
  id: string;

  @ApiProperty({
    type: String,
    description: 'Country code in ISO 3166-1 alpha-2 format',
    example: 'US',
    required: true,
  })
  countryCode: string;

  @ApiProperty({
    type: String,
    description: 'Region or state within the country (optional)',
    example: 'FLorida',
    required: false,
  })
  region?: string;

  @ApiProperty({
    type: Number,
    description: 'Tax rate as a percentage (0-100)',
    example: 7.5,
    required: true,
  })
  rate: number;

  @ApiProperty({
    type: String,
    description: 'ID of the tax class',
    example: '60d5ec49f1c2b14b2c8b4567',
    required: true,
  })
  taxClass: TaxClassResponseDto;

  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the tax rate is active',
    example: true,
    required: true,
  })
  isActive: boolean;

  constructor(
    id: string,
    countryCode: string,
    rate: number,
    taxClass: TaxClassResponseDto,
    isActive: boolean,
    region?: string,
  ) {
    this.id = id;
    this.countryCode = countryCode;
    this.rate = rate;
    this.taxClass = taxClass;
    this.isActive = isActive;
    this.region = region;
  }

  static createFromEntity(taxRate: TaxRate): TaxRateResponseDto {
    const taxRateResponse = new TaxRateResponseDto(
      taxRate.id,
      taxRate.countryCode,
      taxRate.rate,
      TaxClassResponseDto.createFromEntity(taxRate.taxClass),
      taxRate.isActive,
      taxRate.region,
    );
    return taxRateResponse;
  }
}
