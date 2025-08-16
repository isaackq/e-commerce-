// paginated-response.dto.ts
import { Paginated } from '@application/pagination/interfaces/paginated.interface';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> implements Paginated<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty({
    type: Object,
    example: {
      itemsPerPage: 10,
      totalItems: 50,
      cuurentPage: 1,
      totalPages: 5,
    },
  })
  meta: {
    itemsPerPage: number;
    totalItems: number;
    cuurentPage: number;
    totalPages: number;
  };

  @ApiProperty({
    type: Object,
    example: {
      first: '/api/products?page=1',
      last: '/api/products?page=5',
      cuurent: '/api/products?page=1',
      next: '/api/products?page=2',
      previous: '/api/products?page=1',
    },
  })
  links: {
    first: string;
    last: string;
    cuurent: string;
    next: string;
    previous: string;
  };

  constructor(partial: Partial<PaginatedResponseDto<T>>) {
    Object.assign(this, partial);
  }
}
