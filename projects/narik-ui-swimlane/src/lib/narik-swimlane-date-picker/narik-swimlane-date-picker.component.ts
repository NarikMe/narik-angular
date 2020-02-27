import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef, Component, Injector, HostBinding } from "@angular/core";
import {  NarikDatePicker } from "@narik/ui-core";
import { NARIK_DATE_PICKER_INPUTS } from "../input-output-items";

@Component({
  selector: "narik-swimlane-date-picker , narik-date-picker",
  templateUrl: "narik-swimlane-date-picker.component.html",
  inputs: [...NARIK_DATE_PICKER_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikSwimlaneDatePicker),
      multi: true
    }
  ]
})
export class NarikSwimlaneDatePicker extends NarikDatePicker {
  constructor(injector: Injector) {
    super(injector);
  }
}
