import { Cart } from '@domain/entities/Cart';
import { CartDocument } from '@infrastructure/schemas/cart.schema';
import { ProductMapper } from './product.mapper';

export class CartMapper {
  static map(cartDocument: CartDocument | string): Cart {
    const cart = new Cart();
    if (typeof cartDocument === 'string') {
      cart.id = cartDocument;
      return cart;
    }

    cart.id = cartDocument.id;
    cart.items = cartDocument.items.map((item) => {
      return {
        product: ProductMapper.map(item.product as any),
        quantityInCart: item.quantityInCart,
        subtotal: item.subtotal,
        notes: item.notes,
      };
    });
    cart.totalPrice = cartDocument.totalPrice;
    return cart;
  }
}
