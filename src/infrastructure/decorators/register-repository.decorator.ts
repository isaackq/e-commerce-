import { SetMetadata } from '@nestjs/common';

export const REPOSITORY_SYMBOL_KEY = 'repository_symbol';

export const RegisterRepository = (entityName: string) => SetMetadata(REPOSITORY_SYMBOL_KEY, entityName);
