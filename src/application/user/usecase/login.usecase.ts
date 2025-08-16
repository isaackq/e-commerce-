import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingProviderInterface } from '../auth/hashing.provider.interface';
import { SignInDto } from '../Dtos/request/sign-in.dto';
import { TokenGeneratorInterface } from '../auth/token-generator.interface';
import { Token } from '../Dtos/response/token.response.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('userRepository')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('HashingProvider')
    private readonly hashingProvider: HashingProviderInterface,
    @Inject('TokenGenerator')
    private readonly tokenGenerator: TokenGeneratorInterface,
  ) {}

  async execute(signInDto: SignInDto): Promise<Token> {
    const user = await this.userRepository.findOneByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is not activated');
    }
    const pass = await this.hashingProvider.compare(signInDto.password, user.password);

    if (!pass) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return await this.tokenGenerator.generateTokens(user);
  }
}
