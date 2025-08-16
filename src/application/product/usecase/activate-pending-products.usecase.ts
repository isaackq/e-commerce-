import { Product } from '@domain/entities/Product';
import { User } from '@domain/entities/User/User';
import { ProductStatusEnum } from '@domain/enums/product-status.enum';
import { ProductRepositoryInterface } from '@domain/ports/product.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ProductResponseDto } from '../Dtos/response/product.response.dto';

@Injectable()
export class ActivatePendingProductsUsecase {
  constructor(@Inject('ProductRepository') private readonly productRepository: ProductRepositoryInterface) {}
  async execute(product: Product, user: User): Promise<ProductResponseDto> {
    if (product.status !== ProductStatusEnum.PENDING && product.status === ProductStatusEnum.ACTIVE && product.seller) {
      return ProductResponseDto.createFromEntity(product as Product);
    }
    return ProductResponseDto.createFromEntity(await this.productRepository.activePendingProduct(product.id, user.id));
  }
}
