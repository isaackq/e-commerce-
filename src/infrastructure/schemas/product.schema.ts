import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model, Types } from 'mongoose';
import { ProductCategory } from './products-categories.schema';
import { ProductStatusEnum } from '@domain/enums/product-status.enum';
import { TaxClass } from './tax-class.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: false })
  imageUrl?: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({ enum: ProductStatusEnum, required: true })
  status: ProductStatusEnum;

  @Prop({ type: Types.ObjectId, ref: ProductCategory.name, required: true })
  category: Types.ObjectId; //we fillter the product based on the productCategory

  @Prop({ type: Types.ObjectId, ref: 'User' })
  seller: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  admin: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: TaxClass.name, required: true })
  taxClass: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ name: 'text', description: 'text' }, { weights: { name: 5, description: 2 } }); //index text : فهرس خاص بالبحث النصي

export const productModel = model('Product', ProductSchema);

// ProductSchema.methods.displayInfo = function () {
//   return `Product: ${this.productName}, Quantity: ${this.quntity}, Price: $${this.price}`;
// };
