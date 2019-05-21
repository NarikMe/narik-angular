import { NARIK_INPUT_INPUTS, NarikInput } from "narik-ui-core";

import { Component, forwardRef, Injector, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "narik-ngb-input , narik-input",
  templateUrl: "narik-ngb-input.component.html",
  inputs: [...NARIK_INPUT_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNgbInput),
      multi: true
    }
  ]
})
export class NarikNgbInput extends NarikInput {
  _icon: string;
  @Input()
  set icon(value: string) {
    this._icon = value;
  }
  get icon(): string {
    return this._icon;
  }

  constructor(injector: Injector) {
    super(injector);
  }
}
