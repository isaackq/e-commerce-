import { Cart } from '@domain/entities/Cart';
import { CartRepositoryInterface } from '@domain/ports/cart.repository.interface';
import { RegisterRepository } from '@infrastructure/decorators/register-repository.decorator';
import { CartMapper } from '@infrastructure/mappers/cart.mapper';
import { Cart as CartSchema } from '@infrastructure/schemas/cart.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@RegisterRepository('Cart')
@Injectable()
export class CartRepository implements CartRepositoryInterface {
  constructor(@InjectModel(CartSchema.name) private readonly cartModel: Model<CartSchema>) {}

  async saveCart(cart: Cart): Promise<Cart> {
    const cartDocument = await this.cartModel.findByIdAndUpdate(
      cart.id,
      {
        ...cart,
        items: cart.items.map((item) => {
          return {
            product: item.product.id,
            notes: item.notes,
            quantityInCart: item.quantityInCart,
            subtotal: item.subtotal,
          };
        }),
      },
      { new: true },
    );

    return CartMapper.map(await cartDocument.populate('items.product'));
  }

  async findOne(id: string): Promise<Cart> {
    const cartDocumnet = await this.cartModel.findById(id);

    if (!cartDocumnet) {
      return null;
    }
    return CartMapper.map(await cartDocumnet.populate('items.product'));
  }

  async clearCart(id: string): Promise<Cart> {
    const cartDocument = await this.cartModel.findByIdAndUpdate(id, { items: [], totalPrice: 0 }, { new: true });
    return CartMapper.map(cartDocument);
  }
}
