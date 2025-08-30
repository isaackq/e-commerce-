import { TaxClass } from '@domain/entities/TaxClass';
import { ApiProperty } from '@nestjs/swagger';

export class TaxClassResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: '1234567890abcdef',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Name of the tax class',
    example: 'STANDART',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Description of the tax class',
    example: 'Standard tax class for general products',
    type: String,
  })
  description: string;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static createFromEntity(taxClass: TaxClass): TaxClassResponseDto {
    const taxClassResponse = new TaxClassResponseDto(taxClass.id, taxClass.name, taxClass.description);
    return taxClassResponse;
  }
}
