import { TaxClass } from '@domain/entities/TaxClass';
import { FindOneRepositoryInterface } from './find-one.repository.interface';

export interface TaxClassRepositoryInterface extends FindOneRepositoryInterface<TaxClass> {
  save(taxClass: TaxClass): Promise<TaxClass>;
  findOne(id: string): Promise<TaxClass>;
  delete(id: string): Promise<void>;
  findAll(): Promise<TaxClass[]>;
  update(taxClass: TaxClass): Promise<TaxClass>;
}
