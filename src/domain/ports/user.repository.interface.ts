// import { Product } from '../entities/Product';
import { User } from '../entities/User/User';
import { FindOneRepositoryInterface } from './find-one.repository.interface';

export interface UserRepositoryInterface extends FindOneRepositoryInterface<User> {
  save(user: User): Promise<User>;
  createCustomer(user: User): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  findOne(id: string): Promise<User | null>;
  updateOne(user: User, hasEmailUpdate: boolean): Promise<User>;
  // addToCart(Product: Product | Product[], userId: string); //cuurent  user
  // addToFavorites(Product: Product | Product[], userId: string); //cuurent  user
}
