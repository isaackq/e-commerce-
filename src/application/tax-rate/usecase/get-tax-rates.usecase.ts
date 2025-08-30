import { Inject } from '@nestjs/common';
import { TaxRateResponseDto } from '../dto/response/tax-rate.response.dto';
import { TaxRateFilter, TaxRateRepositoryInterface } from '@domain/ports/tax-rate.repository.interface';
import { TaxRateFilterDto } from '../dto/filter/tax-rate.filter.dto';

export class GetTaxRatesUsecase {
  constructor(
    @Inject('TaxRateRepository')
    private readonly taxRateRepository: TaxRateRepositoryInterface,
  ) {}

  async execute(taxRateFilterDto: TaxRateFilterDto): Promise<TaxRateResponseDto[]> {
    console.log('taxRateFilterDto :', taxRateFilterDto.isActive);
    console.log('isActive VALUE:', taxRateFilterDto.isActive, typeof taxRateFilterDto.isActive);
    console.log('👀 Raw query:', JSON.stringify(taxRateFilterDto));
    console.log('🔍 isActive:', taxRateFilterDto.isActive, typeof taxRateFilterDto.isActive);

    const filter = this.toFilter(taxRateFilterDto);

    const TaxRatees = await this.taxRateRepository.findAll(filter);

    return TaxRatees.map((tax) => TaxRateResponseDto.createFromEntity(tax));
  }

  private toFilter(taxRateFilterDto: TaxRateFilterDto): TaxRateFilter {
    return {
      taxClass: taxRateFilterDto.taxClass,
      countryCode: taxRateFilterDto.countryCode,
      isActive: taxRateFilterDto.isActive,
    };
  }
}
