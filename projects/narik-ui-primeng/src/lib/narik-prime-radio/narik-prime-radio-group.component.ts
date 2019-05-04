import {
  Component,
  forwardRef,
  Injector,
  Input,
  HostBinding
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  NarikRadioGroup,
  NARIK_DATA_DISPLAY_VALUE_INPUTS
} from "narik-ui-core";

@Component({
  selector: "narik-prime-radio-group , narik-radio-group",
  templateUrl: "narik-prime-radio-group.component.html",
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikPrimeRadioGroup),
      multi: true
    }
  ]
})
export class NarikPrimeRadioGroup extends NarikRadioGroup {
  constructor(injector: Injector) {
    super(injector);
  }
}
