import { Product } from '@domain/entities/Product';
import { FindOneRepositoryInterface } from './find-one.repository.interface';
import { Paginated } from '@application/pagination/interfaces/paginated.interface';
import { ProductStatusEnum } from '@domain/enums/product-status.enum';

export type ProductFilter = {
  category: string;
  status: ProductStatusEnum;
  seller: string;
};

export interface ProductRepositoryInterface extends FindOneRepositoryInterface<Product> {
  save(product: Product): Promise<Product>;
  findOne(id: string): Promise<Product>;
  delete(id: string): Promise<void>;
  findMany(productFilter?: Partial<ProductFilter>, page?: number, limit?: number): Promise<Paginated<Product>>;
  activePendingProduct(id: string, adminId: string): Promise<Product>;
}
