import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaxRateRequestDto } from '../dto/request/tax-rate.request.dto';
import { TaxRate } from '@domain/entities/TaxRate';
import { TaxClassRepositoryInterface } from '@domain/ports/tax-class.repository.interface';

@Injectable()
export class TaxRateTransformer {
  constructor(
    @Inject('TaxClassRepository')
    private readonly taxClassRepository: TaxClassRepositoryInterface,
  ) {}
  async toEntity(taxRateRequestDto: TaxRateRequestDto): Promise<TaxRate> {
    const taxClass = await this.taxClassRepository.findOne(taxRateRequestDto.taxClass);
    if (!taxClass) {
      throw new NotFoundException('Tax Class not found');
    }
    const taxRate = new TaxRate();
    taxRate.countryCode = taxRateRequestDto.countryCode;
    taxRate.rate = taxRateRequestDto.rate;
    taxRate.region = taxRateRequestDto.region;
    taxRate.taxClass = taxClass;
    taxRate.isActive = taxRateRequestDto.isActive;

    return taxRate;
  }

  async updateEntity(updateTaxRateDto: Partial<TaxRateRequestDto>, taxRate: TaxRate): Promise<TaxRate> {
    if (updateTaxRateDto.taxClass) {
      const taxClass = await this.taxClassRepository.findOne(updateTaxRateDto.taxClass);
      if (!taxClass) {
        throw new NotFoundException('Tax Class not found');
      }
      taxRate.taxClass = taxClass;
    }
    if (updateTaxRateDto.countryCode) taxRate.countryCode = updateTaxRateDto.countryCode;
    if (updateTaxRateDto.rate) taxRate.rate = updateTaxRateDto.rate;
    if (updateTaxRateDto.region) taxRate.region = updateTaxRateDto.region;
    if (typeof updateTaxRateDto.isActive === 'boolean') taxRate.isActive = updateTaxRateDto.isActive;

    return taxRate;
  }
}
