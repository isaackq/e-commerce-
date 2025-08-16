import { ProductCategoryRequestDto } from '@application/productCategory/Dtos/request/product-category-request.dto';
import { ProductCategoryResponseDto } from '@application/productCategory/Dtos/response/product-category.response.dto';
import { CreateProductCategoryUsecase } from '@application/productCategory/usercase/create-product-category.usecase';
import { RolesEnum } from '@domain/enums/role.enum';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product Category')
@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly createProductCategoryUsecase: CreateProductCategoryUsecase) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new product category' })
  @ApiBody({ type: ProductCategoryRequestDto })
  @ApiResponse({
    type: ProductCategoryResponseDto,
    status: HttpStatus.CREATED,
    description: 'Product category created successfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Product category already exists' })
  @Roles([RolesEnum.Admin])
  @Post()
  async addProductCategory(@Body() productCategoryDto: ProductCategoryRequestDto) {
    return await this.createProductCategoryUsecase.execute(productCategoryDto);
  }
}
