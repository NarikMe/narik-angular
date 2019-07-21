export abstract class EntityTypeService {
  abstract addTypeCreator<T>(key: string, creator: () => T);
  abstract getTypeCreator<T>(key: string): () => T;
}
