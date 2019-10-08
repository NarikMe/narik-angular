import { NarikInput } from "narik-ui-core";

import { Component, forwardRef, Injector, HostBinding } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NARIK_INPUT_INPUTS } from "../input-output-items";

@Component({
  selector: "narik-dev-input , narik-input",
  templateUrl: "narik-dev-input.component.html",
  inputs: [...NARIK_INPUT_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikDevInput),
      multi: true
    }
  ]
})
export class NarikDevInput extends NarikInput {
  constructor(injector: Injector) {
    super(injector);
  }

  @HostBinding("class")
  class = "dx-field display-block";
}
