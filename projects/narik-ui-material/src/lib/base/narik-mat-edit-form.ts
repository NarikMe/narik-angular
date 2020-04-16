import { NarikEntity } from "@narik/infrastructure";
import { NarikEditForm } from "@narik/app-core";
import { Injector } from "@angular/core";
export class NarikUiEditForm<T extends NarikEntity> extends NarikEditForm<
  T
> {
  constructor(injector: Injector) {
    super(injector);
  }
}
