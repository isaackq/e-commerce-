import { Inject, Injectable } from '@nestjs/common';
import { ProductCategoryRequestDto } from '../Dtos/request/product-category-request.dto';
import { ProductCategoryRepositoryInterface } from '@domain/ports/product-category.repository.interface';
import { ProductCategoryTransformer } from '../transformer/product-category.transformer';
import { ProductCategoryResponseDto } from '../Dtos/response/product-category.response.dto';

@Injectable()
export class CreateProductCategoryUsecase {
  constructor(
    @Inject('ProductCategoryRepository') private readonly productCategoryRepository: ProductCategoryRepositoryInterface,
    private readonly productCategoryTransformer: ProductCategoryTransformer,
  ) {}

  async execute(productCategoryDto: ProductCategoryRequestDto) {
    const productCategory = this.productCategoryTransformer.toEntity(productCategoryDto);
    return ProductCategoryResponseDto.createFromEntity(await this.productCategoryRepository.save(productCategory));
  }
}
