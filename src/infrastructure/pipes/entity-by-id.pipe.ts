import { RepositoryLocator } from '@infrastructure/locators/repository.locator';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

export const EntityByIdPipe = (entityName: string) => {
  @Injectable()
  class GetEntityByIdPipeClass {
    constructor(readonly locator: RepositoryLocator) {}
    /**
     * Transforms the provided ID into an entity instance.
     * @param id The ID of the entity to retrieve.
     * @returns The entity instance if found.
     * @throws BadRequestException if the ID is not valid or the entity is not found.
     */
    async transform(id: string): Promise<any> {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException(`The provided ID "${id}" is not a valid ObjectId`);
      }

      const entityRepository = this.locator.getRepository(entityName);

      const entity = await entityRepository.findOne(id);

      if (!entity) {
        throw new BadRequestException(`Invalid ${entityName} id`);
      }

      return entity;
    }
  }
  return GetEntityByIdPipeClass;
};
