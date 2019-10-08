import { NarikCheckBox } from "narik-ui-core";

import {
  Component,
  forwardRef,
  Injector
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NARIK_CHECKBOX_INPUTS } from "../input-output-items";

@Component({
  selector: "narik-ngb-checkbox , narik-checkbox",
  templateUrl: "narik-ngb-checkbox.component.html",
  inputs: [...NARIK_CHECKBOX_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNgbCheckBox),
      multi: true
    },
    {
      provide: NarikCheckBox,
      useExisting: forwardRef(() => NarikNgbCheckBox)
    }
  ]
})
export class NarikNgbCheckBox extends NarikCheckBox {
  constructor(injector: Injector) {
    super(injector);
  }
}
