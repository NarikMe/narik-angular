import { Injectable, Type } from '@angular/core';
import { ComponentTypeResolver } from '@narik/infrastructure';
import { DynamicComponents } from '../decorators/dynamic-component.decorator';

@Injectable()
export class NarikComponentTypeResolver extends ComponentTypeResolver {
  constructor() {
    super();
  }

  resolveComponentType(key: string, notFound?: Type<any>): Type<any> {
    if (DynamicComponents[key]) {
      return DynamicComponents[key];
    } else {
      if (notFound) {
        return notFound;
      }
    }
    throw new Error(
      `Could not find any type for "${key}". To define a dynamic component use @DynamicComponent(key)`
    );
  }
}
