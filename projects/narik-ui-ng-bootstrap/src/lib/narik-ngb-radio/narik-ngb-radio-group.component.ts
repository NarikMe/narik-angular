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
  selector: "narik-ngb-radio-group , narik-radio-group",
  templateUrl: "narik-ngb-radio-group.component.html",
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNgbRadioGroup),
      multi: true
    }
  ]
})
export class NarikNgbRadioGroup extends NarikRadioGroup {
  constructor(injector: Injector) {
    super(injector);
  }
}
