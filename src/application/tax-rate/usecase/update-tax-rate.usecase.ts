import { TaxRate } from '@domain/entities/TaxRate';
import { Inject, Injectable } from '@nestjs/common';
import { TaxRateRequestDto } from '../dto/request/tax-rate.request.dto';
import { TaxRateResponseDto } from '../dto/response/tax-rate.response.dto';
import { TaxRateTransformer } from '../trasformers/tax-rate.transformer';
import { TaxRateRepositoryInterface } from '@domain/ports/tax-rate.repository.interface';

@Injectable()
export class UpdateTaxRateUsecase {
  constructor(
    @Inject('TaxRateRepository')
    private readonly taxRateRepository: TaxRateRepositoryInterface,
    private readonly taxRateTransformer: TaxRateTransformer,
  ) {}

  async execute(taxRate: TaxRate, updateTaxRateDto: Partial<TaxRateRequestDto>): Promise<TaxRateResponseDto> {
    const updatedTaxRate = await this.taxRateTransformer.updateEntity(updateTaxRateDto, taxRate);
    return TaxRateResponseDto.createFromEntity(await this.taxRateRepository.update(updatedTaxRate));
  }
}
