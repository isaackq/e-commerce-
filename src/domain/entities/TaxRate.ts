import { TaxClass } from './TaxClass';

export class TaxRate {
  id?: string;

  countryCode: string;

  region?: string;

  rate: number;

  taxClass: TaxClass;

  isActive: boolean;
}
