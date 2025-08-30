import { TaxClass } from '@domain/entities/TaxClass';
import { TaxClassRepositoryInterface } from '@domain/ports/tax-class.repository.interface';
import { Inject } from '@nestjs/common';

export class DeleteTaxClassByIdUsecase {
  constructor(@Inject('TaxClassRepository') private readonly taxClassRepository: TaxClassRepositoryInterface) {}

  async execute(taxClass: TaxClass): Promise<void> {
    await this.taxClassRepository.delete(taxClass.id);
  }
}
