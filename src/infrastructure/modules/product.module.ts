import { ProductTransformer } from '@application/product/trasformers/product.transformer';
import { CreateProductUsecase } from '@application/product/usecase/create-product.usercase';
import { ProductController } from '@infrastructure/controllers/Product.controller';
import { ProductRepository } from '@infrastructure/repositories/product.repository';
import { Product, ProductSchema } from '@infrastructure/schemas/product.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategoryModule } from './product-category.module';
import { GetProductByIdUsecase } from '@application/product/usecase/get-product-by-id.usecase';
import { DeleteProductByIdUsecase } from '@application/product/usecase/delete-product-by-id.usecase';
import { GetProductsUsecase } from '@application/product/usecase/get-products.usecase';
import { ProductCategory, ProductCategorySchema } from '@infrastructure/schemas/products-categories.schema';
import { ActivatePendingProductsUsecase } from '@application/product/usecase/activate-pending-products.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: ProductCategory.name, schema: ProductCategorySchema }]),
    ProductCategoryModule,
  ],
  controllers: [ProductController],
  providers: [
    { provide: 'ProductRepository', useClass: ProductRepository },
    CreateProductUsecase,
    ProductTransformer,
    GetProductByIdUsecase,
    DeleteProductByIdUsecase,
    GetProductsUsecase,
    ActivatePendingProductsUsecase,
  ],
  exports: [{ provide: 'ProductRepository', useClass: ProductRepository }],
})
export class ProductModule {}
