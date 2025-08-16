export class InsufficientStockError extends Error {
  public readonly productId: string;
  public readonly requested: number;
  public readonly available: number;

  constructor(productId: string, requested: number, available: number) {
    super(`Requested quantity (${requested}) exceeds available stock (${available}) for product ${productId}.`);
    this.name = 'InsufficientStockError';
    this.productId = productId;
    this.requested = requested;
    this.available = available;
  }
}
