import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef, Component, Injector, HostBinding } from "@angular/core";
import {  NarikDatePicker } from "@narik/ui-core";
import { NARIK_DATE_PICKER_INPUTS } from "../input-output-items";

@Component({
  selector: "narik-dev-date-picker , narik-date-picker",
  templateUrl: "narik-dev-date-picker.component.html",
  inputs: [...NARIK_DATE_PICKER_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikDevDatePicker),
      multi: true
    }
  ]
})
export class NarikDevDatePicker extends NarikDatePicker {
  @HostBinding("class")
  class = "dx-field display-block";

  constructor(injector: Injector) {
    super(injector);
  }
}
