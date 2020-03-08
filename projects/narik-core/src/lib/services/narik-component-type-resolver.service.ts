import { Injectable, Type } from "@angular/core";
import { ComponentTypeResolver } from "@narik/infrastructure";
import { DynamicForms } from "./../decorators/dynamic-form.decorator";

@Injectable()
export class NarikComponentTypeResolver extends ComponentTypeResolver {
  constructor() {
    super();
  }

  resolveComponentType(key: string, notFound?: Type<any>): Type<any> {
    if (DynamicForms[key]) {
      return DynamicForms[key];
    } else {
      if (notFound) {
        return notFound;
      }
    }
    throw new Error(`colud not find any type for "${key}". to define a dynamic form use @DynamicForm(key)`);
  }
}
