import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AddProductToCartRequestDto } from '../Dtos/request/add-product-to-cart.request.dto';
import { Cart } from '@domain/entities/Cart';
import { ProductRepositoryInterface } from '@domain/ports/product.repository.interface';
import { CartRepository } from '@infrastructure/repositories/cart.repository';
import { Customer } from '@domain/entities/User/Customer';
import { CartItem } from '@domain/entities/interfaces/cart-item.interface';
import { UpdateProductInCartRequestDto } from '../Dtos/request/update-products-in-cart.request.dto';
import { CartItemFactory } from '@domain/factories/cart-item.factory';

@Injectable()
export class CartTransformer {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepositoryInterface,
    @Inject('CartRepository')
    private readonly cartRepository: CartRepository,
  ) {}

  async toEntity(cartRequestDto: AddProductToCartRequestDto, user: Customer): Promise<Cart> {
    const { product, cart } = await this.validate(cartRequestDto, user);

    const isAlreadyInCart = cart.items.some((item) => item.product.id === product.id);
    if (isAlreadyInCart) {
      throw new ConflictException('Product already exists in cart');
    }

    const cartItem: CartItem = CartItemFactory.create(product, cartRequestDto.quantity, cartRequestDto.notes);

    cart.items.push(cartItem);
    cart.totalPrice = this.calculateTotal(cart.items);

    return cart;
  }

  async updateEntity(updateProductInCartRequestDto: UpdateProductInCartRequestDto, user: Customer): Promise<Cart> {
    const { product, cart } = await this.validate(updateProductInCartRequestDto, user);

    const exestingItemIndex = cart.items.findIndex((item) => item.product.id === product.id);

    if (exestingItemIndex === -1) {
      throw new ConflictException('Product does not exist in cart');
    }
    const currentItem = cart.items[exestingItemIndex];
    const newQuantity =
      updateProductInCartRequestDto.quantity != null
        ? updateProductInCartRequestDto.quantity
        : currentItem.quantityInCart;

    const newNotes =
      updateProductInCartRequestDto.notes != null ? updateProductInCartRequestDto.notes : currentItem.notes;

    const updatedItem = CartItemFactory.create(product, newQuantity, newNotes);

    cart.items[exestingItemIndex] = updatedItem;

    cart.totalPrice = this.calculateTotal(cart.items);

    return cart;
  }

  private async validate(
    dto: UpdateProductInCartRequestDto | AddProductToCartRequestDto,
    user: Customer,
  ): Promise<{ product; cart: Cart }> {
    const product = await this.productRepository.findOne(dto.productId);

    if (!product) {
      throw new NotFoundException('Product Not Found');
    }

    const cart = await this.cartRepository.findOne(user.cart.id);

    if (!cart) {
      throw new NotFoundException('Cart Not Found');
    }

    return { product, cart };
  }

  private calculateTotal(items: CartItem[]): number {
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    return Math.round(total * 100) / 100;
  }
}
