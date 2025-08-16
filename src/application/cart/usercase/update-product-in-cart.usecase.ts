import { Customer } from '@domain/entities/User/Customer';
import { CartRepositoryInterface } from '@domain/ports/cart.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateProductInCartRequestDto } from '../Dtos/request/update-products-in-cart.request.dto';
import { CartTransformer } from '../transformers/cart.trasformer';
import { CartResponseDto } from '../Dtos/response/cart.response.dto';

@Injectable()
export class UpdateProductInCartUsecase {
  constructor(
    @Inject('CartRepository')
    private readonly cartRepository: CartRepositoryInterface,
    private readonly cartTransformer: CartTransformer,
  ) {}

  async execute(currentUser: Customer, updateProductInCartDto: UpdateProductInCartRequestDto) {
    const cart = await this.cartTransformer.updateEntity(updateProductInCartDto, currentUser);

    return CartResponseDto.createFromEntity(await this.cartRepository.saveCart(cart));
  }
}
