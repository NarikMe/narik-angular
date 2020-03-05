import { Type, NgModuleRef } from "@angular/core";

export abstract class ComponentTypeResolver {
  abstract resolveComponentType(key: string, notFound?: Type<any>): Type<any>;
}
