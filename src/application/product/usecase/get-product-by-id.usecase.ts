import { Inject, Injectable } from '@nestjs/common';
import { ProductResponseDto } from '../Dtos/response/product.response.dto';
import { ProductRepository } from '@infrastructure/repositories/product.repository';
import { Product } from '@domain/entities/Product';

@Injectable()
export class GetProductByIdUsecase {
  constructor(@Inject('ProductRepository') private readonly productRepository: ProductRepository) {}

  async execute(product: Product) {
    // const product = await this.productRepository.findOne(id);
    return ProductResponseDto.createFromEntity(product);
  }
}
