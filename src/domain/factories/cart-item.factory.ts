import { CartItem } from '@domain/entities/interfaces/cart-item.interface';
import { Product } from '@domain/entities/Product';
import { InsufficientStockError } from '@domain/errors/insufficient-stock.error';

/**
 * Factory for creating valid CartItem instances.
 */
export class CartItemFactory {
  /**
   * Creates a CartItem based on product, quantity, and optional notes.
   *
   * @param product The product being added to the cart.
   * @param quantity Number of units the user wants to add.
   * @param notes Optional notes from the user.
   * @throws Error if quantity exceeds available stock.
   * @returns CartItem instance.
   */
  static create(product: Product, quantity: number, notes: string): CartItem {
    if (quantity > product.stock) {
      throw new InsufficientStockError(product.id, quantity, product.stock);
    }

    return {
      product,
      quantityInCart: quantity,
      subtotal: this.calculateSubtotal(product.price, quantity),
      notes: notes.trim(),
    };
  }

  /**
   * Calculates subtotal for a cart item.
   * @param price Unit price of the product.
   * @param quantity Quantity added to the cart.
   * @returns Rounded subtotal.
   */
  private static calculateSubtotal(price: number, quantity: number): number {
    const total = price * quantity;
    return Math.round(total * 100) / 100; // Round to 2 decimal places
  }
}
