import { Injectable } from '@nestjs/common';
import { TaxClassRequestDto } from '../dto/request/tax-class.request.dto';
import { TaxClass } from '@domain/entities/TaxClass';

@Injectable()
export class TaxClassTransformer {
  toEntity(taxClassRequestDto: TaxClassRequestDto): TaxClass {
    const taxClass = new TaxClass();
    taxClass.name = taxClassRequestDto.name;
    taxClass.description = taxClassRequestDto.description;
    return taxClass;
  }

  updateEntity(updateTaxClassDto: Partial<TaxClassRequestDto>, taxClass: TaxClass): TaxClass {
    if (updateTaxClassDto.name) taxClass.name = updateTaxClassDto.name;
    if (updateTaxClassDto.description) taxClass.description = updateTaxClassDto.description;
    return taxClass;
  }
}
