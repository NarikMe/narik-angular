import {
  NarikCheckBoxList,
  NARIK_DATA_DISPLAY_VALUE_INPUTS
} from "narik-ui-core";
import { Component, forwardRef, Injector, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "narik-ngb-checkbox-list , narik-checkbox-list",
  templateUrl: "narik-ngb-checkbox-list.component.html",
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikNgbCheckBoxList),
      multi: true
    }
  ]
})
export class NarikNgbCheckBoxList extends NarikCheckBoxList {
  constructor(injector: Injector) {
    super(injector);
  }
}
