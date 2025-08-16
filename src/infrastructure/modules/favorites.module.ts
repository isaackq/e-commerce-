import { Favorites, FavoritesSchame } from '@infrastructure/schemas/favorites.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Favorites.name, schema: FavoritesSchame }])],
})
export class FavoritesModule {}
