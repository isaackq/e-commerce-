import { PaginatedResponseDto } from '@application/pagination/Dto/response/pagination.response.dto';
import { ProductFilterDto } from '@application/product/Dtos/filter/product.filter.dto';
import { ProductRequestDto } from '@application/product/Dtos/request/product.request.dto';
import { CreatedProductResponseDto } from '@application/product/dtos/response/created-product.response.dto';
import { ProductResponseDto } from '@application/product/dtos/response/product.response.dto';
import { ActivatePendingProductsUsecase } from '@application/product/usecase/activate-pending-products.usecase';
import { CreateProductUsecase } from '@application/product/usecase/create-product.usercase';
import { DeleteProductByIdUsecase } from '@application/product/usecase/delete-product-by-id.usecase';
import { GetProductByIdUsecase } from '@application/product/usecase/get-product-by-id.usecase';
import { GetProductsUsecase } from '@application/product/usecase/get-products.usecase';
import { Product } from '@domain/entities/Product';
import { User } from '@domain/entities/User/User';
import { RolesEnum } from '@domain/enums/role.enum';
import { CurrentUser } from '@infrastructure/decorators/current-user.decorator';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { EntityByIdPipe } from '@infrastructure/pipes/entity-by-id.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Injectable()
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUsecase: CreateProductUsecase,
    private readonly getProductByIdUsecase: GetProductByIdUsecase,
    private readonly deleteProductByIdUsecase: DeleteProductByIdUsecase,
    private readonly getProductsUsecase: GetProductsUsecase,
    private readonly activePendingProductUsecase: ActivatePendingProductsUsecase,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: ProductRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product created successfully',
    type: CreatedProductResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Product already exists' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Roles([RolesEnum.Admin, RolesEnum.Seller])
  @Post('create')
  async create(
    @Body() productRequestDto: ProductRequestDto,
    @CurrentUser() user: User,
  ): Promise<CreatedProductResponseDto> {
    const response = await this.createProductUsecase.execute(productRequestDto, user);
    return {
      message:
        user.getRole() === RolesEnum.Seller
          ? 'Product added successfully and is pending approval by admin'
          : 'Product created successfully',
      data: response,
    };
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Products retrieved successfully',
    type: PaginatedResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Roles([RolesEnum.Admin, RolesEnum.Seller, RolesEnum.Customer])
  @Get('all')
  async getProducts(
    @Query() productFilterDto: ProductFilterDto,
    @CurrentUser() user: User,
  ): Promise<PaginatedResponseDto<ProductResponseDto>> {
    return await this.getProductsUsecase.execute(productFilterDto, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product retrieved successfully',
    type: CreatedProductResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid product id' })
  @ApiParam({ name: 'id', required: true, type: String, description: 'ID of the product' })
  @Roles([RolesEnum.Admin, RolesEnum.Customer, RolesEnum.Seller])
  @Get('/:id')
  async getProductById(@Param('id', EntityByIdPipe('Product')) product: Product): Promise<ProductResponseDto> {
    return await this.getProductByIdUsecase.execute(product);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Product by ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Product deleted successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: String, description: 'ID of the product' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles([RolesEnum.Admin, RolesEnum.Seller])
  @Delete('/:id')
  async deleteProduct(
    @Param('id', EntityByIdPipe('Product')) product: Product,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.deleteProductByIdUsecase.execute(product, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'activate pending Product by ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Product activated successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true, type: String, description: 'ID of the product' })
  @Roles([RolesEnum.Admin])
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/:id/activate')
  async activePendingProduct(
    @Param('id', EntityByIdPipe('Product')) product: Product,
    @CurrentUser() user: User,
  ): Promise<void> {
    await this.activePendingProductUsecase.execute(product, user);
  }
}
//get products via status
