import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model, Types } from 'mongoose';
import { Product } from './product.schema';

export type FavoritesDocument = HydratedDocument<Favorites>;

@Schema()
export class Favorites extends Document {
  @Prop({ type: [Types.ObjectId], ref: Product.name })
  products: Types.ObjectId[];
}

export const FavoritesSchame = SchemaFactory.createForClass(Favorites);

export const FavoritesModel = model('Favorites', FavoritesSchame);
