import { TaxClass } from '@domain/entities/TaxClass';
import { TaxClassRepositoryInterface } from '@domain/ports/tax-class.repository.interface';
import { RegisterRepository } from '@infrastructure/decorators/register-repository.decorator';
import { TaxClassMapper } from '@infrastructure/mappers/tax-class.mapper';
import { TaxClassDocument, TaxClass as TaxClassSchema } from '@infrastructure/schemas/tax-class.schema';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@RegisterRepository('TaxClass')
@Injectable()
export class TaxClassRepository implements TaxClassRepositoryInterface {
  constructor(
    @InjectModel(TaxClassSchema.name)
    private readonly taxClassModel: Model<TaxClassDocument>,
  ) {}

  async save(taxClass: TaxClass): Promise<TaxClass> {
    const exists = await this.taxClassModel.find({ name: taxClass.name }).exec();
    if (exists.length > 0) {
      throw new ConflictException('A tax class with the same name already exists.');
    }
    const taxClassDocument = await this.taxClassModel.create(taxClass);
    return TaxClassMapper.map(taxClassDocument);
  }

  async findOne(id: string): Promise<TaxClass> {
    const taxClassDocument = await this.taxClassModel.findById(id);
    if (!taxClassDocument) {
      return null;
    }
    return TaxClassMapper.map(taxClassDocument);
  }

  async delete(id: string): Promise<void> {
    await this.taxClassModel.findByIdAndDelete(id);
  }

  async findAll(): Promise<TaxClass[]> {
    const taxClassDocuments = await this.taxClassModel.find();
    return taxClassDocuments.map((tax) => TaxClassMapper.map(tax));
  }

  async update(taxClass: TaxClass): Promise<TaxClass> {
    await this.assertNameIsUnique(taxClass.name, taxClass.id);

    const taxClassDocument = await this.taxClassModel.findByIdAndUpdate(taxClass.id, taxClass, { new: true });

    return TaxClassMapper.map(taxClassDocument);
  }

  private async assertNameIsUnique(name: string, excludeTaxClassId: string): Promise<void> {
    const conflict = await this.taxClassModel.findOne({
      _id: { $ne: excludeTaxClassId },
      name: name,
    });

    if (conflict) {
      throw new ConflictException('name already used');
    }
  }
}
