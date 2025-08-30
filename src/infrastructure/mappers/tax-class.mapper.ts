import { TaxClass } from '@domain/entities/TaxClass';
import { TaxClassDocument } from '@infrastructure/schemas/tax-class.schema';

export class TaxClassMapper {
  static map(taxClassDocument: TaxClassDocument | string) {
    const taxClass = new TaxClass();
    if (typeof taxClassDocument === 'string') {
      taxClass.id = taxClassDocument;
      return taxClass;
    }
    taxClass.id = taxClassDocument.id;
    taxClass.name = taxClassDocument.name;
    taxClass.description = taxClassDocument.description;

    return taxClass;
  }
}
