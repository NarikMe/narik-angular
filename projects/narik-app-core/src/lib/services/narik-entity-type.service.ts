import { EntityTypeService } from '@narik/infrastructure';
import { Injectable } from '@angular/core';

@Injectable()
export class NarikEntityTypeService extends EntityTypeService {
    private creators = new Map<string, () => any>();

    addTypeCreator<T>(key: string, creator: () => T) {
        this.creators.set(key, creator);
    }
    getTypeCreator<T>(key: string): () => T {
        return this.creators.get(key);
    }
}
