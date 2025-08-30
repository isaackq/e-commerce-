import { TaxRate } from '@domain/entities/TaxRate';
import { TaxRateRepositoryInterface } from '@domain/ports/tax-rate.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteTaxRateUsecase {
  constructor(
    @Inject('TaxRateRepository')
    private readonly taxRateRepository: TaxRateRepositoryInterface,
  ) {}

  async execute(taxRate: TaxRate): Promise<void> {
    this.taxRateRepository.delete(taxRate.id);
  }
}
