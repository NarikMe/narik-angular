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
  selector: "narik-ngx-checkbox , narik-checkbox",
  templateUrl: "narik-ngx-checkbox.component.html",
  inputs: [...NARIK_CHECKBOX_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNgxCheckBox),
      multi: true
    },
    {
      provide: NarikCheckBox,
      useExisting: forwardRef(() => NarikNgxCheckBox)
    }
  ]
})
export class NarikNgxCheckBox extends NarikCheckBox {
  constructor(injector: Injector) {
    super(injector);
  }
}
