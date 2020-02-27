import { NarikCheckBox } from "@narik/ui-core";

import {
  Input,
  Component,
  forwardRef,
  HostBinding,
  Injector
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NARIK_CHECKBOX_INPUTS } from "../input-output-items";

@Component({
  selector: "narik-swimlane-checkbox , narik-checkbox",
  templateUrl: "narik-swimlane-checkbox.component.html",
  inputs: [...NARIK_CHECKBOX_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikSwimlaneCheckBox),
      multi: true
    },
    {
      provide: NarikCheckBox,
      useExisting: forwardRef(() => NarikSwimlaneCheckBox)
    }
  ]
})
export class NarikSwimlaneCheckBox extends NarikCheckBox {
  constructor(injector: Injector) {
    super(injector);
  }
}
