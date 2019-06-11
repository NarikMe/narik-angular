import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef, Component, Injector, HostBinding } from "@angular/core";
import { NARIK_DATE_PICKER_INPUTS, NarikDatePicker } from "narik-ui-core";

@Component({
  selector: "narik-nb-date-picker , narik-date-picker",
  templateUrl: "narik-nb-date-picker.component.html",
  inputs: [...NARIK_DATE_PICKER_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNebularDatePicker),
      multi: true
    }
  ]
})
export class NarikNebularDatePicker extends NarikDatePicker {
  constructor(injector: Injector) {
    super(injector);
  }
}
