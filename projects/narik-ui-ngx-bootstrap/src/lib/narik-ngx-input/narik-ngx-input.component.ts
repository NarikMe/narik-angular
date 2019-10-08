import { NarikInput } from "narik-ui-core";

import { Component, forwardRef, Injector, HostBinding } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NARIK_INPUT_INPUTS } from "../input-output-items";

@Component({
  selector: "narik-ngx-input , narik-input",
  templateUrl: "narik-ngx-input.component.html",
  inputs: [...NARIK_INPUT_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNgxInput),
      multi: true
    }
  ]
})
export class NarikNgxInput extends NarikInput {
  constructor(injector: Injector) {
    super(injector);
  }
}
