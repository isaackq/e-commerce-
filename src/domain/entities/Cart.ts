import { CartItem } from './interfaces/cart-item.interface';

export class Cart {
  id?: string;
  items: CartItem[];
  totalPrice: number;
}
