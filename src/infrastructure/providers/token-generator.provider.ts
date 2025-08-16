import { TokenGeneratorInterface } from '@application/user/auth/token-generator.interface';
import { Token } from '@application/user/Dtos/response/token.response.dto';
import { User } from '@domain/entities/User/User';
import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import jwtConfig from '@infrastructure/config/jwt.config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenGenerator implements TokenGeneratorInterface {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtconfig: ConfigType<typeof jwtConfig>,
    @Inject('userRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async generateTokens(user: User): Promise<Token> {
    const [accessToken, refreshToken] = await Promise.all([
      await this.generateToken(user.id, this.jwtconfig.accessTokenTTL, { email: user.email, role: user.getRole() }),
      await this.generateToken(user.id, this.jwtconfig.refreshTokenTTL),
    ]);
    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<Pick<Token, 'accessToken'>> {
    try {
      const { sub } = this.jwtService.verify(refreshToken);

      const user = await this.userRepository.findOne(sub);
      if (!user) {
        throw new UnauthorizedException('user not found ');
      }
      const accessToken = await this.generateToken(sub, this.jwtconfig.accessTokenTTL, {
        email: user.email,
        role: user.getRole(),
      });

      return { accessToken };
    } catch (error) {
      console.log(error);
    }
  }

  private async generateToken<T>(sub: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync({ sub: sub, ...payload }, { expiresIn: expiresIn });
  }
}
