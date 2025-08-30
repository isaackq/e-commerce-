import { TaxRate } from '@domain/entities/TaxRate';
import { FindOneRepositoryInterface } from './find-one.repository.interface';

export type TaxRateFilter = {
  taxClass: string;
  countryCode: string;
  isActive: boolean;
};

export interface TaxRateRepositoryInterface extends FindOneRepositoryInterface<TaxRate> {
  save(taxRate: TaxRate): Promise<TaxRate>;
  findOne(id: string): Promise<TaxRate>;
  update(taxRate: TaxRate): Promise<TaxRate>;
  delete(id: string): Promise<void>;
  findAll(filter: Partial<TaxRateFilter>): Promise<TaxRate[]>;
  findByTaxClass(taxClassId: string): Promise<TaxRate[]>;
  findActiveRate(taxClassId: string, countryCode: string, region?: string): Promise<TaxRate | null>;
}
