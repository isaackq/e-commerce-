import { RolesEnum } from '@domain/enums/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, model, Types } from 'mongoose';
import { Cart } from './cart.schema';
import { Favorites } from './favorites.schema';
// import { Product } from './product.schema';

export type UserDocument = HydratedDocument<User>; // تعني اضافة خصائص مونقوس  الى الكلاس العادي زي اليوزر يعني لما اعرف مت غير بهادا النوع بتظهر الي خصائص مونقوس

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Date, required: true })
  birthday: Date;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: Boolean, required: true })
  isActive: boolean;

  @Prop({ enum: RolesEnum, required: true })
  role: RolesEnum;

  //customer attripute
  @Prop({
    type: Types.ObjectId,
    ref: Cart.name,
    required: function (this: User) {
      return RolesEnum.Customer === this.role;
    },
  })
  cart: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Favorites.name,
    required: function (this: User) {
      return RolesEnum.Customer === this.role;
    },
  })
  favorites: Types.ObjectId;

  //Seller atriputes
  // @Prop({
  //   type: [Types.ObjectId],
  //   ref: Product.name,
  //   required: function (this: User) {
  //     return RolesEnum.Seller === this.role;
  //   },
  // })
  // products: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = model('User', UserSchema);
