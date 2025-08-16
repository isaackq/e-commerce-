// src/application/services/target-customer-resolver.service.ts

import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { RolesEnum } from '@domain/enums/role.enum';
import { User } from '@domain/entities/User/User';
import { Customer } from '@domain/entities/User/Customer';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';

@Injectable()
export class TargetCustomerResolver {
  constructor(@Inject('userRepository') private readonly userRepository: UserRepositoryInterface) {}

  async resolve(user: User, customerId?: string): Promise<Customer> {
    if (user.getRole() === RolesEnum.Admin) {
      if (!customerId) {
        throw new BadRequestException('Customer ID is required for admin');
      }

      const targetUser = await this.userRepository.findOne(customerId);
      if (!targetUser) {
        throw new NotFoundException('Customer not found');
      }

      return targetUser as Customer; // assume your mapper already ensures this
    }

    return user as Customer;
  }
}
