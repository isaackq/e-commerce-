import { ProductCategory } from '@domain/entities/ProductCategory';
import { ProductCategoryDocument } from '@infrastructure/schemas/products-categories.schema';

export class ProductCategoryMapper {
  static map(productCategoryDocument: ProductCategoryDocument | string): ProductCategory {
    const productCategory = new ProductCategory();
    if (typeof productCategoryDocument === 'string') {
      productCategory.id = productCategoryDocument;
      return productCategory;
    }
    productCategory.id = productCategoryDocument.id;
    productCategory.category = productCategoryDocument.category;
    return productCategory;
  }
}
