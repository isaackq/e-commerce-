import { CartRepositoryInterface } from '@domain/ports/cart.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { CartResponseDto } from '../Dtos/response/cart.response.dto';
import { User } from '@domain/entities/User/User';
import { TargetCustomerResolver } from '@application/user/providers/target-customer-resolver.provider';

@Injectable()
export class ClearCartUsecase {
  constructor(
    @Inject('CartRepository') private readonly cartRepository: CartRepositoryInterface,
    private readonly targetCustomerResolver: TargetCustomerResolver,
  ) {}

  async execute(user: User, customerId: string) {
    const tragetUser = await this.targetCustomerResolver.resolve(user, customerId);
    return CartResponseDto.createFromEntity(await this.cartRepository.clearCart(tragetUser.cart.id));
  }
}
