import { ProductResponseDto } from '@application/product/Dtos/response/product.response.dto';
import { Cart } from '@domain/entities/Cart';
import { CartItem } from '@domain/entities/interfaces/cart-item.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CartItemResponseDto {
  @ApiProperty({ type: ProductResponseDto })
  product: ProductResponseDto;

  @ApiProperty()
  quantityInCart: number;

  @ApiProperty()
  subtotal: number;

  @ApiProperty()
  notes: string;
  constructor(product: ProductResponseDto, quantityInCart: number, subtotal: number, notes: string) {
    this.product = product;
    this.quantityInCart = quantityInCart;
    this.subtotal = subtotal;
    this.notes = notes;
  }

  static createFromEntity(item: CartItem): CartItemResponseDto {
    return new CartItemResponseDto(
      ProductResponseDto.createFromEntity(item.product),
      item.quantityInCart,
      item.subtotal,
      item.notes,
    );
  }
}

export class CartResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the cart',
    example: '1234567890abcdef',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'List of products in the cart',
    type: [CartItemResponseDto],
  })
  items: CartItemResponseDto[];

  totalPrice: number;

  constructor(id: string, items: CartItemResponseDto[], totalPrice: number) {
    this.id = id;
    this.items = items;
    this.totalPrice = totalPrice;
  }

  static createFromEntity(cart: Cart): CartResponseDto {
    let cartResponse: CartResponseDto;
    if (cart.items && cart.items.length > 0) {
      cartResponse = new CartResponseDto(
        cart.id,
        cart.items.map((item) => CartItemResponseDto.createFromEntity(item)),
        cart.totalPrice,
      );
    } else {
      cartResponse = new CartResponseDto(cart.id, [], 0);
    }
    return cartResponse;
  }
}
