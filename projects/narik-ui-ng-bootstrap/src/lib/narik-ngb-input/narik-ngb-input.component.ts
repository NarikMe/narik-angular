import { NARIK_INPUT_INPUTS, NarikInput } from "narik-ui-core";

import { Component, forwardRef, Injector, HostBinding } from "@angular/core";
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
  constructor(injector: Injector) {
    super(injector);
  }
}
