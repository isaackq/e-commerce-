import { AddProductToCartRequestDto } from '@application/cart/Dtos/request/add-product-to-cart.request.dto';
import { UpdateProductInCartRequestDto } from '@application/cart/Dtos/request/update-products-in-cart.request.dto';
import { CartResponseDto } from '@application/cart/Dtos/response/cart.response.dto';
import { AddProductToCartUsecase } from '@application/cart/usercase/add-product-to-cart.usecase';
import { ClearCartUsecase } from '@application/cart/usercase/clear-cart.usecase';
import { GetCustomerCartUsecase } from '@application/cart/usercase/get-customer-cart.usecase';
import { UpdateProductInCartUsecase } from '@application/cart/usercase/update-product-in-cart.usecase';
import { Customer } from '@domain/entities/User/Customer';
import { User } from '@domain/entities/User/User';
import { RolesEnum } from '@domain/enums/role.enum';
import { CurrentUser } from '@infrastructure/decorators/current-user.decorator';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { Body, Controller, Delete, Get, HttpStatus, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('cart')
export class CartController {
  constructor(
    private readonly addProductToCartUsecase: AddProductToCartUsecase,
    private readonly getCustomerCartUsecase: GetCustomerCartUsecase,
    private readonly updateProductInCartUsecase: UpdateProductInCartUsecase,
    private readonly clearCartUsecase: ClearCartUsecase,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add products to shopping cart' })
  @ApiBody({ type: AddProductToCartRequestDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Added to cart successfuly', type: CartResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflict' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiQuery({ name: 'customerId', type: String, required: false, description: 'Customer ID For The Admin' })
  @Roles([RolesEnum.Customer, RolesEnum.Admin])
  @Post('add-to-cart')
  async addProdcutToCart(
    @Body() addProductToCartRequestDto: AddProductToCartRequestDto,
    @CurrentUser() user: User,
    @Query('customerId') customerId?: string,
  ): Promise<CartResponseDto> {
    return await this.addProductToCartUsecase.execute(addProductToCartRequestDto, user, customerId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Show the cart of the current customer' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Fetched Successfully', type: CartResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cart Not Found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles([RolesEnum.Customer])
  @Get('user-cart')
  async getCart(@CurrentUser() user: User): Promise<CartResponseDto> {
    return await this.getCustomerCartUsecase.execute(user as Customer);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product in the shopping cart' })
  @ApiBody({ type: UpdateProductInCartRequestDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Product updated in cart successfully', type: CartResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product or Cart Not Found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflict' })
  @Roles([RolesEnum.Customer])
  @Patch('update-product-in-cart')
  async updateProductInCart(
    @Body() updateProductInCartDto: UpdateProductInCartRequestDto,
    @CurrentUser() user: User,
  ): Promise<CartResponseDto> {
    return await this.updateProductInCartUsecase.execute(user as Customer, updateProductInCartDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'clear products form shopping cart' })
  @ApiResponse({ status: HttpStatus.OK, description: 'cart cleared successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiQuery({ name: 'customerId', type: String, required: false, description: 'Customer ID For The Admin' })
  @Roles([RolesEnum.Customer, RolesEnum.Admin])
  @Delete('clear')
  async cleareCart(@CurrentUser() user: User, @Query('customerId') customerId?: string): Promise<CartResponseDto> {
    return await this.clearCartUsecase.execute(user, customerId);
  }
}
