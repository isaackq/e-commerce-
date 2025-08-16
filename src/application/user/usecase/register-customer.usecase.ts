import { Inject, Injectable } from '@nestjs/common';
import { CustomerRequestDto } from '../Dtos/request/customer.request.dto';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { UserTransformer } from '../transformer/user.transformer';
import { CustomerResponseDto } from '../Dtos/response/customer.response.dto';
import { Customer } from '@domain/entities/User/Customer';

@Injectable()
export class RegisterCustomerUseCase {
  constructor(
    @Inject('userRepository') private readonly userRepository: UserRepositoryInterface,
    private readonly userTransformer: UserTransformer,
  ) {}

  async execute(CustomerRequestDto: CustomerRequestDto) {
    const customer = this.userTransformer.toEntity(CustomerRequestDto);
    return CustomerResponseDto.createFromEntity((await this.userRepository.createCustomer(customer)) as Customer);
  }
}
