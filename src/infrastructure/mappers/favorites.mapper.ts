import { Favorites } from '@domain/entities/Favorites';
import { FavoritesDocument } from '@infrastructure/schemas/favorites.schema';
import { ProductMapper } from './product.mapper';

export class FavoritesMapper {
  static map(favoritesDocument: FavoritesDocument): Favorites {
    const favorites = new Favorites();
    if (typeof favoritesDocument === 'string') {
      favorites.id = favoritesDocument;
      return favorites;
    }
    favorites.id = favoritesDocument.id;
    favorites.Products = favoritesDocument.products.map((productDocument) => ProductMapper.map(productDocument as any));
    return favorites;
  }
}
