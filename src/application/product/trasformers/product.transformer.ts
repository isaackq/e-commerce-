import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRequestDto } from '../Dtos/request/product.request.dto';
import { Product } from '@domain/entities/Product';
import { ProductCategoryRepositoryInterface } from '@domain/ports/product-category.repository.interface';
import { User } from '@domain/entities/User/User';
import { RolesEnum } from '@domain/enums/role.enum';
import { ProductStatusEnum } from '@domain/enums/product-status.enum';

@Injectable()
export class ProductTransformer {
  constructor(
    @Inject('ProductCategoryRepository') private readonly productCategoryRepository: ProductCategoryRepositoryInterface,
  ) {}

  async toEntity(productRequestDto: ProductRequestDto, user: User): Promise<Product> {
    const category = await this.productCategoryRepository.findOne(productRequestDto.category);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const product = new Product();
    product.name = productRequestDto.name;
    product.description = productRequestDto.description;
    product.imageUrl = productRequestDto.imageUrl;
    product.stock = productRequestDto.stock;
    product.price = productRequestDto.price;
    product.category = category;
    if (user.getRole() === RolesEnum.Seller) {
      product.status = ProductStatusEnum.PENDING;
      product.seller = user;
      return product;
    }
    if (user.getRole() === RolesEnum.Admin) {
      product.status = ProductStatusEnum.ACTIVE;
      product.admin = user;
      return product;
    }
  }
}
