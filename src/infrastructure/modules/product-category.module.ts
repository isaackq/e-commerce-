import { ProductCategoryTransformer } from '@application/productCategory/transformer/product-category.transformer';
import { CreateProductCategoryUsecase } from '@application/productCategory/usercase/create-product-category.usecase';
import { ProductCategoryController } from '@infrastructure/controllers/product-category.controller';
import { ProductCategoryRepository } from '@infrastructure/repositories/product-category.repository';
import { ProductCategory, ProductCategorySchema } from '@infrastructure/schemas/products-categories.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductCategory.name, schema: ProductCategorySchema }])],
  providers: [
    CreateProductCategoryUsecase,
    { provide: 'ProductCategoryRepository', useClass: ProductCategoryRepository },
    ProductCategoryTransformer,
  ],
  controllers: [ProductCategoryController],
  exports: [{ provide: 'ProductCategoryRepository', useClass: ProductCategoryRepository }],
})
export class ProductCategoryModule {}
