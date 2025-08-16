import { ProductCategory } from '@domain/entities/ProductCategory';
import { FindOneRepositoryInterface } from './find-one.repository.interface';

export interface ProductCategoryRepositoryInterface extends FindOneRepositoryInterface<ProductCategory> {
  save(productCategory: ProductCategory): Promise<ProductCategory>;
  findOne(id: string): Promise<ProductCategory>;
}
