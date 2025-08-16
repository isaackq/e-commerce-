import { ProductCategoryEnum } from '@domain/enums/products.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model } from 'mongoose';

export type ProductCategoryDocument = HydratedDocument<ProductCategory>;

@Schema()
export class ProductCategory extends Document {
  @Prop({ enum: ProductCategoryEnum, required: true, unique: true })
  category: ProductCategoryEnum;
}

export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);

export const ProductCategoryModel = model('ProductCategory', ProductCategorySchema);
