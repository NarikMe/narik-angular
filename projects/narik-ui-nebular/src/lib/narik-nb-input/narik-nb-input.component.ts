import { NARIK_INPUT_INPUTS, NarikInput } from "narik-ui-core";

import { Component, forwardRef, Injector, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "narik-nb-input , narik-input",
  templateUrl: "narik-nb-input.component.html",
  inputs: [...NARIK_INPUT_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNebularInput),
      multi: true
    }
  ]
})
export class NarikNebularInput extends NarikInput {
  hasFocus = false;
  
  _icon: string;
  @Input()
  set icon(value: string) {
    this._icon = value;
  }
  get icon(): string {
    return this._icon;
  }

  @Input()
  fullWidth = false;

  constructor(injector: Injector) {
    super(injector);
  }
}
