import { PartialType, PickType } from '@nestjs/swagger';
import { UserRequestDto } from './user.request.dto';

export class UpdateUserInfoDto extends PartialType(
  PickType(UserRequestDto, ['firstName', 'lastName', 'email', 'birthday', 'city'] as const),
) {}
