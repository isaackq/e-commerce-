import { ProductStatusEnum } from '@domain/enums/product-status.enum';
import { ProductCategory } from './ProductCategory';
import { Seller } from './User/Seller';
import { Admin } from './User/Admin';

export class Product {
  public id?: string;
  public name: string;
  public description: string;
  public imageUrl?: string;
  public stock: number;
  public price: number;
  public status: ProductStatusEnum;
  public category: ProductCategory;
  public seller: Seller;
  public admin: Admin;
}
