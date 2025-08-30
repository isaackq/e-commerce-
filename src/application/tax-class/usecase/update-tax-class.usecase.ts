import { TaxClassRepositoryInterface } from '@domain/ports/tax-class.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { TaxClassRequestDto } from '../dto/request/tax-class.request.dto';
import { TaxClass } from '@domain/entities/TaxClass';
import { TaxClassTransformer } from '../trasformers/tax-class.transformer';
import { TaxClassResponseDto } from '../dto/response/tax-class.response.dto';

@Injectable()
export class UpdateTaxClassUseCase {
  constructor(
    @Inject('TaxClassRepository')
    private readonly taxClassRepository: TaxClassRepositoryInterface,
    private readonly taxClassTransformer: TaxClassTransformer,
  ) {}

  async execute(taxClass: TaxClass, updateTaxClassDto: Partial<TaxClassRequestDto>): Promise<TaxClassResponseDto> {
    const updatedTaxClass = this.taxClassTransformer.updateEntity(updateTaxClassDto, taxClass);
    return TaxClassResponseDto.createFromEntity(await this.taxClassRepository.update(updatedTaxClass));
  }
}
