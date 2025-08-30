import { TaxRate } from '@domain/entities/TaxRate';
import { TaxRateFilter, TaxRateRepositoryInterface } from '@domain/ports/tax-rate.repository.interface';
import { RegisterRepository } from '@infrastructure/decorators/register-repository.decorator';
import { TaxRateMapper } from '@infrastructure/mappers/tax-rate.mapper';
import { TaxRate as TaxRateSchema } from '@infrastructure/schemas/tax-rate.schema';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@RegisterRepository('TaxRate')
@Injectable()
export class TaxRateRepository implements TaxRateRepositoryInterface {
  constructor(
    @InjectModel(TaxRateSchema.name)
    private readonly taxRateModel: Model<TaxRateSchema>,
  ) {}

  async save(taxRate: TaxRate): Promise<TaxRate> {
    // const exists = await this.taxRateModel.find({ countryCode: taxRate.countryCode }).exec();
    // if (exists.length > 0) {
    //   throw new ConflictException('A tax rate with the same country Code already exists.');
    // }
    const taxRateDocument = await this.taxRateModel.create({ ...taxRate, taxClass: taxRate.taxClass.id });
    return TaxRateMapper.map(await taxRateDocument.populate('taxClass'));
  }

  async findOne(id: string): Promise<TaxRate> {
    const doc = await this.taxRateModel.findById(id);
    if (!doc) {
      return null;
    }
    return TaxRateMapper.map(await doc.populate('taxClass'));
  }

  async update(taxRate: TaxRate): Promise<TaxRate> {
    // await this.assertCountryCodeIsUnique(taxRate.countryCode, taxRate.id);

    const updatedTaxRate = await this.taxRateModel.findByIdAndUpdate(
      taxRate.id,
      { ...taxRate, taxClass: taxRate.taxClass.id },
      { new: true },
    );

    return TaxRateMapper.map(await updatedTaxRate.populate('taxClass'));
  }

  async delete(id: string): Promise<void> {
    await this.taxRateModel.findByIdAndDelete(id);
  }

  async findAll(filter: Partial<TaxRateFilter>): Promise<TaxRate[]> {
    const param = this.buildParams(filter);

    const taxRateDocs = await this.taxRateModel.find(param).populate('taxClass');

    return taxRateDocs.map(TaxRateMapper.map);
  }

  private buildParams(filter?: Partial<TaxRateFilter>) {
    const params = {};
    if (filter) {
      const { taxClass, countryCode, isActive } = filter;
      if (taxClass) {
        params['taxClass'] = taxClass;
      }
      if (countryCode) {
        params['countryCode'] = countryCode;
      }
      if (typeof isActive === 'boolean') {
        //because it might be false and then do not pass the condition
        params['isActive'] = isActive;
      }
    }
    return params;
  }

  async findByTaxClass(taxClassId: string): Promise<TaxRate[]> {
    const docs = await this.taxRateModel.find({ taxClass: taxClassId });
    return docs.map(TaxRateMapper.map);
  }

  async findActiveRate(taxClassId: string, countryCode: string, region?: string): Promise<TaxRate | null> {
    const query = {
      taxClass: taxClassId,
      countryCode,
      isActive: true,
      ...(region ? { region } : {}),
    };

    const doc = await this.taxRateModel.findOne(query).sort({ region: -1 }).populate('taxClass');

    return doc ? TaxRateMapper.map(doc) : null;
  }

  private async assertCountryCodeIsUnique(countryCode: string, excludeTaxRateId: string): Promise<void> {
    const conflict = await this.taxRateModel.findOne({
      _id: { $ne: excludeTaxRateId },
      countryCode: countryCode,
    });

    if (conflict) {
      throw new ConflictException('country Code already used');
    }
  }
}
