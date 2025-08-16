export interface FindOneRepositoryInterface<T> {
  findOne(id: string): Promise<T | null>;
}
