import { ProductCategory } from '@domain/entities/ProductCategory';
import { ProductCategoryRepositoryInterface } from '@domain/ports/product-category.repository.interface';
import { RegisterRepository } from '@infrastructure/decorators/register-repository.decorator';
import { ProductCategoryMapper } from '@infrastructure/mappers/product-category.mapper';
import {
  ProductCategoryDocument,
  ProductCategory as ProductCategorySchema,
} from '@infrastructure/schemas/products-categories.schema';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@RegisterRepository('ProductCategory')
@Injectable()
export class ProductCategoryRepository implements ProductCategoryRepositoryInterface {
  constructor(
    @InjectModel(ProductCategorySchema.name)
    private readonly ProductCategoryModel: Model<ProductCategoryDocument>,
  ) {}

  async save(productCategory: ProductCategory): Promise<ProductCategory> {
    const existingCategory = await this.ProductCategoryModel.find({ category: productCategory.category }).exec();

    if (existingCategory.length === 1) {
      throw new ConflictException('Product category already exists');
    }
    const PG = await this.ProductCategoryModel.create({ category: productCategory.category });
    return ProductCategoryMapper.map(PG);
  }

  async findOne(id: string): Promise<ProductCategory> {
    const category = await this.ProductCategoryModel.findById(id);

    if (!category) {
      return null;
    }
    return ProductCategoryMapper.map(category);
  }
}
