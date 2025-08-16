import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { Roles } from '@infrastructure/decorators/roles.decorator';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @Inject('userRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractToken(request);

      if (!token) {
        throw new UnauthorizedException();
      }

      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException();
      }

      request.user = user;

      if (!roles.includes(payload.role)) {
        return false;
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractToken(request: Request) {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.split(' ')[1];
  }
}
