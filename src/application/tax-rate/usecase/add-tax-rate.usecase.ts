import { TaxRateRepositoryInterface } from '@domain/ports/tax-rate.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { TaxRateTransformer } from '../trasformers/tax-rate.transformer';
import { TaxRateRequestDto } from '../dto/request/tax-rate.request.dto';
import { TaxRateResponseDto } from '../dto/response/tax-rate.response.dto';

@Injectable()
export class AddTaxRateUsecase {
  constructor(
    @Inject('TaxRateRepository')
    private readonly taxRateRepository: TaxRateRepositoryInterface,
    private readonly taxRateTransformer: TaxRateTransformer,
  ) {}

  async execute(taxRateRequestDto: TaxRateRequestDto) {
    const taxRate = await this.taxRateTransformer.toEntity(taxRateRequestDto);
    return TaxRateResponseDto.createFromEntity(await this.taxRateRepository.save(taxRate));
  }
}
