import { ProductRepositoryInterface } from '@domain/ports/product.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ProductTransformer } from '../trasformers/product.transformer';
import { ProductRequestDto } from '../Dtos/request/product.request.dto';
import { ProductResponseDto } from '../Dtos/response/product.response.dto';
import { User } from '@domain/entities/User/User';
// import { ProductRequestDto } from '../Dtos/request/product.request.dto';

@Injectable()
export class CreateProductUsecase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepositoryInterface,
    private readonly productTransformer: ProductTransformer,
  ) {}

  async execute(productRequestDto: ProductRequestDto, user: User): Promise<ProductResponseDto> {
    const product = await this.productTransformer.toEntity(productRequestDto, user);

    return ProductResponseDto.createFromEntity(await this.productRepository.save(product));
  }
}
