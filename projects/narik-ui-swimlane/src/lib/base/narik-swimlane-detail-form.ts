import { NarikEntity } from "narik-infrastructure";
import { NarikDetailForm } from "narik-app-core";
import { Injector } from "@angular/core";
export class NarikUiDetailForm<T extends NarikEntity> extends NarikDetailForm<
  T
> {
  constructor(injector: Injector) {
    super(injector);
  }
}
