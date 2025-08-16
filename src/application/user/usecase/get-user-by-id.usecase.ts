import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDto } from '../Dtos/response/user.response.dto';
import { User } from '@domain/entities/User/User';

@Injectable()
export class GetUserByIdUsecase {
  constructor(@Inject('userRepository') private readonly userRepository: UserRepositoryInterface) {}
  async execute(user: User) {
    return UserResponseDto.createFromEntity(await this.userRepository.findOne(user.id));
  }
}
