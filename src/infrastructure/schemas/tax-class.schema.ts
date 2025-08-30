import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaxClassDocument = HydratedDocument<TaxClass>;

@Schema({ timestamps: true })
export class TaxClass {
  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ type: String })
  description?: string;
}

export const TaxClassSchema = SchemaFactory.createForClass(TaxClass);
