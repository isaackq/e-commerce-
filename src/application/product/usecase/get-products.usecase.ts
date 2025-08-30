import { ProductFilter, ProductRepositoryInterface } from '@domain/ports/product.repository.interface';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ProductFilterDto } from '../Dtos/filter/product.filter.dto';
import { ProductResponseDto } from '../Dtos/response/product.response.dto';
import { PaginatedResponseDto } from '@application/pagination/Dto/response/pagination.response.dto';
import { User } from '@domain/entities/User/User';
import { RolesEnum } from '@domain/enums/role.enum';
import { ProductStatusEnum } from '@domain/enums/product-status.enum';

type ProductFilterLike = ProductFilterDto & { q?: string };

@Injectable()
export class GetProductsUsecase {
  constructor(@Inject('ProductRepository') private readonly productRepository: ProductRepositoryInterface) {}

  async execute(productFilterDto: ProductFilterLike, user: User): Promise<PaginatedResponseDto<ProductResponseDto>> {
    const filter = this.toFilter(productFilterDto, user);
    const pagination = await this.productRepository.findMany(filter, productFilterDto.page, productFilterDto.limit);

    return new PaginatedResponseDto<ProductResponseDto>({
      ...pagination,
      data: pagination.data.map((product) => ProductResponseDto.createFromEntity(product)),
    });
  }

  private toFilter(meetingFilterDto: ProductFilterLike, user: User): Partial<ProductFilter> {
    let status;
    let seller;
    const { status: filterStatus, category, q } = meetingFilterDto;

    if (user.getRole() === RolesEnum.Customer) {
      if ([ProductStatusEnum.ACTIVE].includes(filterStatus)) {
        status = filterStatus;
      } else {
        throw new ForbiddenException(`Customer not allowed to show ${filterStatus}`);
      }
    } else if (user.getRole() === RolesEnum.Seller) {
      if ([ProductStatusEnum.ACTIVE, ProductStatusEnum.PENDING, ProductStatusEnum.REJECTED].includes(filterStatus)) {
        status = filterStatus;
        [ProductStatusEnum.PENDING, ProductStatusEnum.REJECTED].includes(filterStatus) ? (seller = user.id) : null; //show the REJECTED and PENDING for the current seller only if active show all products
      } else {
        throw new ForbiddenException(`Seller not allowed to show ${filterStatus}`);
      }
    } else if (user.getRole() === RolesEnum.Admin) {
      status = filterStatus;
    }

    return { category, status, seller, q };
  }
}
