import { Type } from "@angular/core";

export abstract class ComponentTypeResolver {
  abstract resolveComponentType(key: string): Type<any>;
}
