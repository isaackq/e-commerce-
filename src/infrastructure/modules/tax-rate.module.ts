import { TaxRateTransformer } from '@application/tax-rate/trasformers/tax-rate.transformer';
import { TaxRateRepository } from '@infrastructure/repositories/tax-rate.repository';
import { TaxRate, TaxRateSchema } from '@infrastructure/schemas/tax-rate.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaxClassModule } from './tax-class.module';
import { AddTaxRateUsecase } from '@application/tax-rate/usecase/add-tax-rate.usecase';
import { TaxRateController } from '@infrastructure/controllers/tax-rate.controller';
import { GetTaxRateByIdUsecase } from '@application/tax-rate/usecase/get-tax-rate-by-id.usecase';
import { UpdateTaxRateUsecase } from '@application/tax-rate/usecase/update-tax-rate.usecase';
import { DeleteTaxRateUsecase } from '@application/tax-rate/usecase/delete-tax-rate.usecase';
import { GetTaxRatesUsecase } from '@application/tax-rate/usecase/get-tax-rates.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: TaxRate.name, schema: TaxRateSchema }]), TaxClassModule],
  controllers: [TaxRateController],
  providers: [
    { provide: 'TaxRateRepository', useClass: TaxRateRepository },
    TaxRateTransformer,
    AddTaxRateUsecase,
    GetTaxRateByIdUsecase,
    UpdateTaxRateUsecase,
    DeleteTaxRateUsecase,
    GetTaxRatesUsecase,
  ],
})
export class TaxRateModule {}
