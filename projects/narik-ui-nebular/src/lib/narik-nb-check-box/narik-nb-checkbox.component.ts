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
  selector: "narik-nb-checkbox , narik-checkbox",
  templateUrl: "narik-nb-checkbox.component.html",
  inputs: [...NARIK_CHECKBOX_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNebularCheckBox),
      multi: true
    },
    {
      provide: NarikCheckBox,
      useExisting: forwardRef(() => NarikNebularCheckBox)
    }
  ]
})
export class NarikNebularCheckBox extends NarikCheckBox {
  constructor(injector: Injector) {
    super(injector);
  }
}
