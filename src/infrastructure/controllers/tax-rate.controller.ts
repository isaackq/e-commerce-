import { TaxRateFilterDto } from '@application/tax-rate/dto/filter/tax-rate.filter.dto';
import { TaxRateRequestDto } from '@application/tax-rate/dto/request/tax-rate.request.dto';
import { TaxRateResponseDto } from '@application/tax-rate/dto/response/tax-rate.response.dto';
import { AddTaxRateUsecase } from '@application/tax-rate/usecase/add-tax-rate.usecase';
import { DeleteTaxRateUsecase } from '@application/tax-rate/usecase/delete-tax-rate.usecase';
import { GetTaxRateByIdUsecase } from '@application/tax-rate/usecase/get-tax-rate-by-id.usecase';
import { GetTaxRatesUsecase } from '@application/tax-rate/usecase/get-tax-rates.usecase';
import { UpdateTaxRateUsecase } from '@application/tax-rate/usecase/update-tax-rate.usecase';
import { TaxRate } from '@domain/entities/TaxRate';
import { RolesEnum } from '@domain/enums/role.enum';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { EntityByIdPipe } from '@infrastructure/pipes/entity-by-id.pipe';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, PartialType } from '@nestjs/swagger';
@ApiTags('Tax Rate')
@Controller('tax-rate')
export class TaxRateController {
  constructor(
    private readonly addTaxRateUsecase: AddTaxRateUsecase,
    private readonly getTaxRateByIdUsecase: GetTaxRateByIdUsecase,
    private readonly updateTaxRateUseCase: UpdateTaxRateUsecase,
    private readonly deleteTaxRateUsecase: DeleteTaxRateUsecase,
    private readonly getTaxRatesUsecase: GetTaxRatesUsecase,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add Tax Rate' })
  @ApiBody({ type: TaxRateRequestDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Tax Rate created successfully', type: TaxRateResponseDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Tax Rate already exists' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Roles([RolesEnum.Admin])
  @Post()
  async create(@Body() taxRateRequestDto: TaxRateRequestDto): Promise<TaxRateResponseDto> {
    console.log(taxRateRequestDto.isActive);

    return this.addTaxRateUsecase.execute(taxRateRequestDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all tax Ratees' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tax Ratees retrieved successfully',
    type: TaxRateResponseDto,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Roles([RolesEnum.Admin])
  @Get('all')
  findAll(@Query() taxRateFilterDto: TaxRateFilterDto): Promise<TaxRateResponseDto[]> {
    return this.getTaxRatesUsecase.execute(taxRateFilterDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Tax Rate By ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tax Rate retrieved successfully',
    type: TaxRateResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tax Rate not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid Tax Rate id' })
  @ApiParam({ name: 'id', type: String, required: true, description: 'id of the tax Rate ' })
  @Roles([RolesEnum.Admin, RolesEnum.Seller])
  @Get(':id')
  async findOne(@Param('id', EntityByIdPipe('TaxRate')) taxRate: TaxRate): Promise<TaxRateResponseDto> {
    console.log(taxRate);

    return this.getTaxRateByIdUsecase.execute(taxRate);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'update Tax Rate By ID' })
  @ApiBody({ type: TaxRateRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tax Rate updated successfully',
    type: TaxRateResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tax Rate not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid Tax Rate id' })
  @ApiParam({ name: 'id', type: String, required: true, description: 'id of the tax Rate ' })
  @Roles([RolesEnum.Admin])
  @Patch(':id')
  async update(
    @Param('id', EntityByIdPipe('TaxRate')) taxRate: TaxRate,
    @Body() updateTaxRateDto: Partial<TaxRateRequestDto>,
  ) {
    return await this.updateTaxRateUseCase.execute(taxRate, updateTaxRateDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Tax Rate By ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Tax Rate deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tax Rate not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid Tax Rate id' })
  @ApiParam({ name: 'id', type: String, required: true, description: 'id of the tax Rate ' })
  @Roles([RolesEnum.Admin])
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', EntityByIdPipe('TaxRate')) taxRate: TaxRate): Promise<void> {
    this.deleteTaxRateUsecase.execute(taxRate);
  }
}
