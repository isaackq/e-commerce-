import { AdminRequestDto } from '@application/user/Dtos/request/admin.request.dto';
import { CustomerRequestDto } from '@application/user/Dtos/request/customer.request.dto';
import { SellerRequestDto } from '@application/user/Dtos/request/seller.request.dto';
import { UpdateUserInfoDto } from '@application/user/Dtos/request/update-user-info.request.dto';
import { AdminResponseDto } from '@application/user/Dtos/response/admin.response.dtp';
import { CustomerResponseDto } from '@application/user/Dtos/response/customer.response.dto';
import { SellerResponseDto } from '@application/user/Dtos/response/seller.response.dot';
import { UserResponseDto } from '@application/user/Dtos/response/user.response.dto';
import { GetUserByIdUsecase } from '@application/user/usecase/get-user-by-id.usecase';
import { RegisterAdminUsecase } from '@application/user/usecase/register-admin.usecase';
import { RegisterCustomerUseCase } from '@application/user/usecase/register-customer.usecase';
import { RegesterSellerUsecase } from '@application/user/usecase/register-seller.usecase copy';
import { UpdateUserInformationUseCase } from '@application/user/usecase/update-user-information.usecase';
import { User } from '@domain/entities/User/User';
import { RolesEnum } from '@domain/enums/role.enum';
import { CurrentUser } from '@infrastructure/decorators/current-user.decorator';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { EntityByIdPipe } from '@infrastructure/pipes/entity-by-id.pipe';
import {
  Body,
  Controller,
  Get,
  Header,
  HttpStatus,
  Injectable,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { seconds, SkipThrottle, Throttle } from '@nestjs/throttler';

@Injectable()
@Controller('users')
export class UserController {
  constructor(
    private readonly registerCustomerUseCase: RegisterCustomerUseCase,
    private readonly registerSellerUsecase: RegesterSellerUsecase,
    private readonly registerAdminUsecase: RegisterAdminUsecase,
    private readonly getUserByIdUsecase: GetUserByIdUsecase,
    private readonly updateUserInformationUseCase: UpdateUserInformationUseCase,
  ) {}

  @ApiOperation({ summary: 'Add a new customer' })
  @ApiBody({ type: CustomerRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Customer was added successfully.',
    type: CustomerResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User already exists' })
  @Throttle({ default: { ttl: seconds(10), limit: 4 }, short: { ttl: seconds(10), limit: 4 } }) // overRide the defualt throttle and short
  @Post('/add-customer')
  async registerCustomer(
    @Body(new ValidationPipe()) customerRequestDto: CustomerRequestDto,
  ): Promise<CustomerResponseDto> {
    return await this.registerCustomerUseCase.execute(customerRequestDto);
  }

  @ApiOperation({ summary: 'Add a new seller' })
  @ApiBody({ type: SellerRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Seller was added successfully.',
    type: SellerResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User already exists' })
  @SkipThrottle({ short: true, medium: true }) //skip the short rate limit and medium rate limit
  @Post('/add-seller')
  async registerSeller(@Body(new ValidationPipe()) sellerRequestDto: SellerRequestDto): Promise<SellerResponseDto> {
    return await this.registerSellerUsecase.execute(sellerRequestDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new admin' })
  @ApiBody({ type: SellerRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Admin was added successfully.',
    type: SellerResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User already exists' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @Roles([RolesEnum.Admin])
  @Post('/add-admin')
  async registerAdmin(@Body(new ValidationPipe()) adminRequestDto: AdminRequestDto): Promise<AdminResponseDto> {
    return await this.registerAdminUsecase.execute(adminRequestDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User details were retrieved successfully.',
    type: UserResponseDto,
  })
  @Roles([RolesEnum.Admin, RolesEnum.Customer, RolesEnum.Seller])
  @Get('/me')
  async getUser(@CurrentUser() user: User): Promise<UserResponseDto> {
    return await this.getUserByIdUsecase.execute(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user information by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User details were retrieved successfully.',
    type: UserResponseDto,
  })
  @ApiParam({ name: 'id', type: String, required: true, description: 'Id of the user' })
  @Roles([RolesEnum.Admin])
  @Get('/:id')
  async getUserByID(@Param('id', EntityByIdPipe('User')) user: User): Promise<UserResponseDto> {
    return await this.getUserByIdUsecase.execute(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiBody({ type: UpdateUserInfoDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User profile updated successfully.',
    type: UserResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflict , email already in use ' })
  @Roles([RolesEnum.Customer, RolesEnum.Seller, RolesEnum.Admin])
  @Patch('/me')
  @Header('Content-Type', 'application/json')
  async updateProfile(
    @Body() UpdateUserInfoDto: UpdateUserInfoDto,
    @CurrentUser() user: User,
  ): Promise<Partial<UserResponseDto>> {
    return await this.updateUserInformationUseCase.execute(UpdateUserInfoDto, user);
  }
}
