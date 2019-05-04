import { NarikCheckBox, NARIK_CHECKBOX_INPUTS } from "narik-ui-core";

import {
  Input,
  Component,
  forwardRef,
  HostBinding,
  Injector
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "narik-prime-checkbox , narik-checkbox",
  templateUrl: "narik-prime-checkbox.component.html",
  inputs: [...NARIK_CHECKBOX_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikPrimeCheckBox),
      multi: true
    },
    {
      provide: NarikCheckBox,
      useExisting: forwardRef(() => NarikPrimeCheckBox)
    }
  ]
})
export class NarikPrimeCheckBox extends NarikCheckBox {
  constructor(injector: Injector) {
    super(injector);
  }
}
