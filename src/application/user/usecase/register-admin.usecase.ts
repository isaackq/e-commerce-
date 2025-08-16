import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { UserTransformer } from '../transformer/user.transformer';
import { AdminRequestDto } from '../Dtos/request/admin.request.dto';
import { Admin } from '@domain/entities/User/Admin';
import { AdminResponseDto } from '../Dtos/response/admin.response.dtp';

@Injectable()
export class RegisterAdminUsecase {
  constructor(
    @Inject('userRepository') private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
  ) {}

  async execute(adminRequestDto: AdminRequestDto): Promise<AdminResponseDto> {
    const admin = this.userTransformer.toEntity(adminRequestDto);
    return AdminResponseDto.createFromEntity((await this.userRepository.save(admin)) as Admin);
  }
}
