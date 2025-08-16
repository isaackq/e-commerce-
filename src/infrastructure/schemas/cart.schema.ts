import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model, Types } from 'mongoose';
import { Product } from './product.schema';
import { CartItem } from '@domain/entities/interfaces/cart-item.interface';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({
    type: [
      {
        product: { type: Types.ObjectId, ref: Product.name, require: true, unique: true, default: null },
        quantityInCart: { type: Number, require: true, default: 0 },
        subtotal: { type: Number, require: true, default: 0 },
        notes: { type: String, require: true, default: null },
      },
    ],
    default: [],
  })
  items: CartItem[];

  @Prop({ type: Number, require: true, default: 0 })
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.pre('save', function (next) {
  next();
});

export const CartModel = model('Cart', CartSchema);
