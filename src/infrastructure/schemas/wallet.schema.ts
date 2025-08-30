import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types, model } from 'mongoose';
import { User } from '@infrastructure/schemas/user.schema';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true, unique: true })
  owner: Types.ObjectId;

  // store in smallest unit (e.g., cents)
  @Prop({ type: Number, required: true, default: 0, min: 0 })
  balance: number;

  @Prop({ type: String, required: true, default: 'USD', uppercase: true })
  currency: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
WalletSchema.index({ owner: 1 }, { unique: true });

export const WalletModel = model(Wallet.name, WalletSchema);
