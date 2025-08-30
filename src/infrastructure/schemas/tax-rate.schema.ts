import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { TaxClass } from './tax-class.schema';

export type TaxRateDocument = HydratedDocument<TaxRate>;

@Schema({ timestamps: true })
export class TaxRate {
  @Prop({ required: true })
  countryCode: string;

  @Prop()
  region?: string;

  @Prop({ required: true })
  rate: number;

  @Prop({ type: Types.ObjectId, ref: TaxClass.name, required: true })
  taxClass: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const TaxRateSchema = SchemaFactory.createForClass(TaxRate);
