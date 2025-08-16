import { Reflector } from '@nestjs/core';

export type MapEntityMetaData = { source?: 'params' | 'query' | 'body'; paramName?: string };

export const MapEntity = Reflector.createDecorator<MapEntityMetaData>();
