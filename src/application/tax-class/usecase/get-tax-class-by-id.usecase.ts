import { TaxClassRepositoryInterface } from '@domain/ports/tax-class.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { TaxClassResponseDto } from '../dto/response/tax-class.response.dto';
import { TaxClass } from '@domain/entities/TaxClass';

@Injectable()
export class GetTaxClassByIdUsecase {
  async execute(taxClass: TaxClass): Promise<TaxClassResponseDto> {
    return TaxClassResponseDto.createFromEntity(taxClass);
  }
}
