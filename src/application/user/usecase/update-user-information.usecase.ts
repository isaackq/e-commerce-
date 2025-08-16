import { User } from '@domain/entities/User/User';
import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDto } from '../Dtos/response/user.response.dto';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { UserTransformer } from '../transformer/user.transformer';
import { UpdateUserInfoDto } from '../Dtos/request/update-user-info.request.dto';
import { Birthday } from '@domain/ObjectValues/Birthday';

@Injectable()
export class UpdateUserInformationUseCase {
  constructor(
    @Inject('userRepository')
    private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
  ) {}

  async execute(updateUserInfoDto: UpdateUserInfoDto, user: User): Promise<Partial<UserResponseDto>> {
    const { flag } = this.checkAtriputes(updateUserInfoDto, user);
    if (flag) {
      return UserResponseDto.createFromEntity(user);
    }
    const updatedUser = await this.userTransformer.updateEntity(updateUserInfoDto, user);
    return UserResponseDto.createFromEntity(
      await this.userRepository.updateOne(updatedUser, updateUserInfoDto.email ? true : false),
    );
  }

  private checkAtriputes(updateUserInfoDto, user) {
    const keys = Object.keys(updateUserInfoDto) as (keyof UpdateUserInfoDto)[];

    let date: Birthday | null = null;
    let flag = true;

    for (const key of keys) {
      if (key === 'birthday') {
        date = new Birthday(updateUserInfoDto[key]);
        if (date.value.getTime() !== user[key].value.getTime()) {
          flag = false;
          continue;
        }
      } else {
        if (String(updateUserInfoDto[key]) !== String(user[key])) {
          flag = false;
          continue;
        }
      }
    }

    return { flag };
  }
}
