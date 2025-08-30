import { TaxClassRepositoryInterface } from '@domain/ports/tax-class.repository.interface';
import { Inject } from '@nestjs/common';
import { TaxClassTransformer } from '../trasformers/tax-class.transformer';
import { TaxClassRequestDto } from '../dto/request/tax-class.request.dto';
import { TaxClassResponseDto } from '../dto/response/tax-class.response.dto';

export class AddTaxClassUseCase {
  constructor(
    @Inject('TaxClassRepository')
    private readonly taxClassRepository: TaxClassRepositoryInterface,
    private readonly taxClassTransformer: TaxClassTransformer,
  ) {}

  async execute(taxClassRequestDto: TaxClassRequestDto): Promise<TaxClassResponseDto> {
    const taxClass = this.taxClassTransformer.toEntity(taxClassRequestDto);
    return TaxClassResponseDto.createFromEntity(await this.taxClassRepository.save(taxClass));
  }
}
