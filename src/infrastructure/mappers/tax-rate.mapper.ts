import { TaxClass } from '@domain/entities/TaxClass';
import { TaxRate } from '@domain/entities/TaxRate';
import { TaxClassDocument } from '@infrastructure/schemas/tax-class.schema';
import { TaxRateDocument } from '@infrastructure/schemas/tax-rate.schema';
import { TaxClassMapper } from './tax-class.mapper';

export class TaxRateMapper {
  static map(taxRateDocument: TaxRateDocument) {
    const taxRate = new TaxRate();
    if (typeof taxRateDocument === 'string') {
      taxRate.id = taxRateDocument;
      return taxRate;
    }
    taxRate.id = taxRateDocument.id;
    taxRate.countryCode = taxRateDocument.countryCode;
    taxRate.region = taxRateDocument.region;
    taxRate.rate = taxRateDocument.rate;
    taxRate.taxClass = TaxClassMapper.map(taxRateDocument.taxClass as any);
    taxRate.isActive = taxRateDocument.isActive;

    return taxRate;
  }
}
