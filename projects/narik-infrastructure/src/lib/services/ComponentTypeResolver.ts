import { Type } from '@angular/core';

export abstract class ComponentTypeResolver {
    abstract resolveComponentType(key: string, notFound?: Type<any>): Type<any>;
    abstract registerComponentType(key: string, componentType: Type<any>);
}
