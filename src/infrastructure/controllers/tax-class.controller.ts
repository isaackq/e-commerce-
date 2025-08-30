import { AddProductToCartUsecase } from '@application/cart/usercase/add-product-to-cart.usecase';
import { TaxClassRequestDto } from '@application/tax-class/dto/request/tax-class.request.dto';
import { TaxClassResponseDto } from '@application/tax-class/dto/response/tax-class.response.dto';
import { AddTaxClassUseCase } from '@application/tax-class/usecase/add-tax-class.usecase';
import { DeleteTaxClassByIdUsecase } from '@application/tax-class/usecase/delete-tax-class-by-id.usecase';
import { GetTaxClassByIdUsecase } from '@application/tax-class/usecase/get-tax-class-by-id.usecase';
import { GetTaxClassesUsecase } from '@application/tax-class/usecase/get-tax-classes.usecase';
import { UpdateTaxClassUseCase } from '@application/tax-class/usecase/update-tax-class.usecase';
import { TaxClass } from '@domain/entities/TaxClass';
import { RolesEnum } from '@domain/enums/role.enum';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { EntityByIdPipe } from '@infrastructure/pipes/entity-by-id.pipe';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, PartialType } from '@nestjs/swagger';

@Controller('tax-class')
export class TaxClassController {
  constructor(
    private readonly addTaxClassUseCase: AddTaxClassUseCase,
    private readonly getTaxClassByIdUsecase: GetTaxClassByIdUsecase,
    private readonly deleteTaxClassByIdUsecase: DeleteTaxClassByIdUsecase,
    private readonly updateTaxClassUseCase: UpdateTaxClassUseCase,
    private readonly getTaxClassesUsecase: GetTaxClassesUsecase,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add Tax Class' })
  @ApiBody({ type: TaxClassRequestDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Tax Class created successfully', type: TaxClassResponseDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Tax Class already exists' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Roles([RolesEnum.Admin])
  @Post()
  async create(@Body() taxClassRequestDto: TaxClassRequestDto): Promise<TaxClassResponseDto> {
    return this.addTaxClassUseCase.execute(taxClassRequestDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all tax classes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tax Classes retrieved successfully',
    type: TaxClassResponseDto,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Roles([RolesEnum.Admin])
  @Get('all')
  findAll() {
    return this.getTaxClassesUsecase.execute();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Tax Class By ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tax Class retrieved successfully',
    type: TaxClassResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tax Class not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid product id' })
  @ApiParam({ name: 'id', type: String, required: true, description: 'id of the tax class ' })
  @Roles([RolesEnum.Admin, RolesEnum.Seller])
  @Get(':id')
  async findOne(@Param('id', EntityByIdPipe('TaxClass')) taxClass: TaxClass): Promise<TaxClassResponseDto> {
    return this.getTaxClassByIdUsecase.execute(taxClass);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'update Tax Class By ID' })
  @ApiBody({ type: TaxClassRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tax Class updated successfully',
    type: TaxClassResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tax Class not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid Tax Class id' })
  @ApiParam({ name: 'id', type: String, required: true, description: 'id of the tax class ' })
  @Roles([RolesEnum.Admin])
  @Patch(':id')
  async update(
    @Param('id', EntityByIdPipe('TaxClass')) taxClass: TaxClass,
    @Body() updateTaxClassDto: Partial<TaxClassRequestDto>,
  ) {
    return this.updateTaxClassUseCase.execute(taxClass, updateTaxClassDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Tax Class By ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Tax Class deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tax Class not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid Tax Class id' })
  @ApiParam({ name: 'id', type: String, required: true, description: 'id of the tax class ' })
  @Roles([RolesEnum.Admin])
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', EntityByIdPipe('TaxClass')) taxClass: TaxClass): Promise<void> {
    this.deleteTaxClassByIdUsecase.execute(taxClass);
  }
}
