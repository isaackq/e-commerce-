import { Product } from '@domain/entities/Product';
import { ProductDocument } from '@infrastructure/schemas/product.schema';
import { ProductCategoryMapper } from './product-category.mapper';
import { UserMapper } from './user.maper';

export class ProductMapper {
  static map(productDocument: ProductDocument | string): Product {
    const product = new Product();
    if (typeof productDocument === 'string') {
      product.id = productDocument;
      return product;
    }

    product.id = productDocument.id;
    product.name = productDocument.name;
    product.description = productDocument.description;
    product.imageUrl = productDocument.imageUrl;
    product.stock = productDocument.stock;
    product.price = productDocument.price;
    product.status = productDocument.status;
    product.category = ProductCategoryMapper.map(productDocument.category as any);
    product.seller = UserMapper.map(productDocument.seller as any);

    product.admin = UserMapper.map(productDocument.admin as any);

    return product;
  }
}
