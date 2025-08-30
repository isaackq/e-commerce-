import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types, model } from 'mongoose';
import { Wallet } from './wallet.schema';
import { TransactionType } from '@domain/enums/transaction-type.enum';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ type: Types.ObjectId, ref: Wallet.name, required: true })
  wallet: Types.ObjectId;

  @Prop({ type: String, enum: Object.values(TransactionType), required: true })
  type: TransactionType;

  // store in smallest unit (e.g., cents)
  @Prop({ type: Number, required: true, min: 0 })
  amount: number;

  @Prop({ type: String, required: true, default: 'USD', uppercase: true })
  currency: string;

  @Prop({ type: String })
  sourceType?: string;

  @Prop({ type: String })
  sourceId?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Map, of: String })
  meta?: Map<string, string>;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
TransactionSchema.index({ wallet: 1, createdAt: -1 });
TransactionSchema.index({ wallet: 1, type: 1, createdAt: -1 });

export const TransactionModel = model(Transaction.name, TransactionSchema);
