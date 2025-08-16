import { UserRepositoryInterface } from '@domain/ports/user.repository.interface';
import { MapEntity } from '@infrastructure/decorators/map-entity.decorator';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject()
    private readonly userRepository: UserRepositoryInterface,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const metadate = this.reflector.get(MapEntity, context.getHandler());

    const { source = 'body', paramName = 'id' } = metadate;

    const userId = request[source][paramName];

    const user = request.user;

    console.log(user, userId);

    return true;
  }
}
