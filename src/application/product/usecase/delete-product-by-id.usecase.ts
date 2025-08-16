import { ProductRepositoryInterface } from '@domain/ports/product.repository.interface';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Product } from '@domain/entities/Product';
import { User } from '@domain/entities/User/User';
import { RolesEnum } from '@domain/enums/role.enum';

@Injectable()
export class DeleteProductByIdUsecase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async execute(product: Product, user: User): Promise<void> {
    if (user.getRole() === RolesEnum.Seller) {
      if (user.id !== product.seller.id) {
        throw new ForbiddenException();
      }
      await this.productRepository.delete(product.id);
    }
    await this.productRepository.delete(product.id);
  }
}
