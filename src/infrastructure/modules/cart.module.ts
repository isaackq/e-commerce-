import { CartTransformer } from '@application/cart/transformers/cart.trasformer';
import { AddProductToCartUsecase } from '@application/cart/usercase/add-product-to-cart.usecase';
import { CartController } from '@infrastructure/controllers/Cart.controller';
import { Cart, CartSchema } from '@infrastructure/schemas/cart.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product.module';
import { CartRepository } from '@infrastructure/repositories/cart.repository';
import { GetCustomerCartUsecase } from '@application/cart/usercase/get-customer-cart.usecase';
import { UpdateProductInCartUsecase } from '@application/cart/usercase/update-product-in-cart.usecase';
import { ClearCartUsecase } from '@application/cart/usercase/clear-cart.usecase';
import { UserModule } from './user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]), ProductModule, UserModule],
  controllers: [CartController],
  providers: [
    AddProductToCartUsecase,
    CartTransformer,
    GetCustomerCartUsecase,
    UpdateProductInCartUsecase,
    ClearCartUsecase,
    { provide: 'CartRepository', useClass: CartRepository },
  ],
})
export class CartModule {}
