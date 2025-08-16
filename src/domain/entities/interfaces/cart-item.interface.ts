import { Product } from '../Product';

export interface CartItem {
  product: Product;
  quantityInCart: number;
  subtotal: number;
  notes: string;
}
