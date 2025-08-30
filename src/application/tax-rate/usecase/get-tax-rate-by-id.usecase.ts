import { TaxRate } from '@domain/entities/TaxRate';
import { TaxRateResponseDto } from '../dto/response/tax-rate.response.dto';

export class GetTaxRateByIdUsecase {
  async execute(taxRate: TaxRate): Promise<TaxRateResponseDto> {
    return TaxRateResponseDto.createFromEntity(taxRate);
  }
}
