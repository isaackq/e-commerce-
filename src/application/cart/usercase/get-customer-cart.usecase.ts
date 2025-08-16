import { Customer } from '@domain/entities/User/Customer';
import { CartRepositoryInterface } from '@domain/ports/cart.repository.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CartResponseDto } from '../Dtos/response/cart.response.dto';

@Injectable()
export class GetCustomerCartUsecase {
  constructor(@Inject('CartRepository') private readonly cartRepository: CartRepositoryInterface) {}

  async execute(user: Customer) {
    const cart = await this.cartRepository.findOne(user.cart.id);
    if (!cart) {
      throw new NotFoundException('Cart Not Found');
    }
    return CartResponseDto.createFromEntity(cart);
  }
}
