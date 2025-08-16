import { Inject, Injectable } from '@nestjs/common';
import { CartTransformer } from '../transformers/cart.trasformer';
import { User } from '@domain/entities/User/User';
import { AddProductToCartRequestDto } from '../Dtos/request/add-product-to-cart.request.dto';
import { Customer } from '@domain/entities/User/Customer';
import { CartResponseDto } from '../Dtos/response/cart.response.dto';
import { CartRepositoryInterface } from '@domain/ports/cart.repository.interface';

import { TargetCustomerResolver } from '@application/user/providers/target-customer-resolver.provider';

@Injectable()
export class AddProductToCartUsecase {
  constructor(
    @Inject('CartRepository')
    private readonly cartRepository: CartRepositoryInterface,
    private readonly cartTransformer: CartTransformer,
    private readonly targetCustomerResolver: TargetCustomerResolver,
  ) {}

  async execute(addProductToCartRequestDto: AddProductToCartRequestDto, user: User, customerId?: string) {
    const targerUser = await this.targetCustomerResolver.resolve(user, customerId);

    const cart = await this.cartTransformer.toEntity(addProductToCartRequestDto, targerUser as Customer);

    return CartResponseDto.createFromEntity(await this.cartRepository.saveCart(cart));
  }
}
