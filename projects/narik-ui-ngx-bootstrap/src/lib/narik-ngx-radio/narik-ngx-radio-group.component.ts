import {
  Component,
  forwardRef,
  Injector,
  Input,
  HostBinding
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  NarikRadioGroup
} from "narik-ui-core";
import { NARIK_DATA_DISPLAY_VALUE_INPUTS } from "../input-output-items";

@Component({
  selector: "narik-ngx-radio-group , narik-radio-group",
  templateUrl: "narik-ngx-radio-group.component.html",
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNgxRadioGroup),
      multi: true
    }
  ]
})
export class NarikNgxRadioGroup extends NarikRadioGroup {
  constructor(injector: Injector) {
    super(injector);
  }
}
