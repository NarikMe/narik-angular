import {
  ComponentTypeResolver,
  DYNAMIC_COMPONENTS
} from "narik-infrastructure";
import { Type, Injectable, Inject } from "@angular/core";

@Injectable()
export class NarikComponentTypeResolver extends ComponentTypeResolver {
  components: Type<any>[] = [];

  constructor(@Inject(DYNAMIC_COMPONENTS) components: Type<any>[]) {
    super();
    this.components = [].concat.apply([], components);
  }

  resolveComponentType(key: string): Type<any> {
    return this.components.filter(
      x => x.name === key || x["COMPONENT_NAME"] === key
    )[0];
  }
}
