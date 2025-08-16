import { Inject, Injectable } from '@nestjs/common';
import { SellerRequestDto } from '../Dtos/request/seller.request.dto';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { UserTransformer } from '../transformer/user.transformer';
import { SellerResponseDto } from '../Dtos/response/seller.response.dot';
import { Seller } from '@domain/entities/User/Seller';

@Injectable()
export class RegesterSellerUsecase {
  constructor(
    @Inject('userRepository') private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
  ) {}

  async execute(sellerRequestDto: SellerRequestDto) {
    const seller = this.userTransformer.toEntity(sellerRequestDto);
    return SellerResponseDto.createFromEntity((await this.userRepository.save(seller)) as Seller);
  }
}
