import { TaxClassRepositoryInterface } from '@domain/ports/tax-class.repository.interface';
import { Inject } from '@nestjs/common';
import { TaxClassResponseDto } from '../dto/response/tax-class.response.dto';

export class GetTaxClassesUsecase {
  constructor(
    @Inject('TaxClassRepository')
    private readonly taxClassRepository: TaxClassRepositoryInterface,
  ) {}

  async execute(): Promise<TaxClassResponseDto[]> {
    const TaxClasses = await this.taxClassRepository.findAll();
    return TaxClasses.map((tax) => TaxClassResponseDto.createFromEntity(tax));
  }
}
