import { TaxClassTransformer } from '@application/tax-class/trasformers/tax-class.transformer';
import { AddTaxClassUseCase } from '@application/tax-class/usecase/add-tax-class.usecase';
import { DeleteTaxClassByIdUsecase } from '@application/tax-class/usecase/delete-tax-class-by-id.usecase';
import { GetTaxClassByIdUsecase } from '@application/tax-class/usecase/get-tax-class-by-id.usecase';
import { GetTaxClassesUsecase } from '@application/tax-class/usecase/get-tax-classes.usecase';
import { UpdateTaxClassUseCase } from '@application/tax-class/usecase/update-tax-class.usecase';
import { TaxClassController } from '@infrastructure/controllers/tax-class.controller';
import { TaxClassRepository } from '@infrastructure/repositories/tax-class.repository';
import { TaxClass, TaxClassSchema } from '@infrastructure/schemas/tax-class.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: TaxClass.name, schema: TaxClassSchema }])],
  controllers: [TaxClassController],
  providers: [
    { provide: 'TaxClassRepository', useClass: TaxClassRepository },
    TaxClassTransformer,
    AddTaxClassUseCase,
    GetTaxClassByIdUsecase,
    DeleteTaxClassByIdUsecase,
    UpdateTaxClassUseCase,
    GetTaxClassesUsecase,
  ],
  exports: [{ provide: 'TaxClassRepository', useClass: TaxClassRepository }],
})
export class TaxClassModule {}
