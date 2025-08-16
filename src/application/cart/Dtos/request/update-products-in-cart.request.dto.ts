import { IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { AddProductToCartRequestDto } from './add-product-to-cart.request.dto';

class OptinalFeilds extends PartialType(OmitType(AddProductToCartRequestDto, ['productId'] as const)) {}

class RequiredProductId extends PickType(AddProductToCartRequestDto, ['productId'] as const) {}

export class UpdateProductInCartRequestDto extends IntersectionType(RequiredProductId, OptinalFeilds) {}
