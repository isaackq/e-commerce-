import { FindOneRepositoryInterface } from '@domain/ports/find-one.repository.interface';
import { REPOSITORY_SYMBOL_KEY } from '@infrastructure/decorators/register-repository.decorator';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

@Injectable()
export class RepositoryLocator implements OnModuleInit {
  private repositories = new Map<string, FindOneRepositoryInterface<any>>();
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}
  onModuleInit() {
    const repositories = this.discovery.getProviders().filter((wrapper) => this.isTagged(wrapper));
    repositories.forEach((repository) => {
      this.repositories.set(this.reflector.get(REPOSITORY_SYMBOL_KEY, repository.metatype), repository.instance);
    });
  }

  getRepository(entityName: string): FindOneRepositoryInterface<any> {
    const repository = this.repositories.get(entityName);

    if (!repository) {
      throw new NotFoundException(`Repository not found for entity: ${entityName}`);
    }
    return repository;
  }

  private isTagged(wrapper: InstanceWrapper) {
    return wrapper.metatype && typeof this.reflector.get(REPOSITORY_SYMBOL_KEY, wrapper.metatype) === 'string';
  }
}
