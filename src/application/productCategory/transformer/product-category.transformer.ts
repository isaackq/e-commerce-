import { Injectable } from '@nestjs/common';
import { ProductCategoryRequestDto } from '../Dtos/request/product-category-request.dto';
import { ProductCategory } from '@domain/entities/ProductCategory';

@Injectable()
export class ProductCategoryTransformer {
  toEntity(productCategoryRequestDto: ProductCategoryRequestDto): ProductCategory {
    const productCategory = new ProductCategory();
    productCategory.category = productCategoryRequestDto.category;
    return productCategory;
  }
}
