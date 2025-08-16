import { Cart } from '@domain/entities/Cart';
import { FindOneRepositoryInterface } from './find-one.repository.interface';

export interface CartRepositoryInterface extends FindOneRepositoryInterface<Cart> {
  saveCart(cart: Cart): Promise<Cart>;
  findOne(id: string): Promise<Cart>;
  clearCart(id: string): Promise<Cart>;
}
