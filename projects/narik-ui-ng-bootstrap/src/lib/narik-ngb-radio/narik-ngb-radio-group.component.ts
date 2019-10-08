import {
  Component,
  forwardRef,
  Injector,
  Input
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  NarikRadioGroup
} from "narik-ui-core";
import { NARIK_DATA_DISPLAY_VALUE_INPUTS } from "../input-output-items";

@Component({
  selector: "narik-ngb-radio-group , narik-radio-group",
  templateUrl: "narik-ngb-radio-group.component.html",
  styleUrls: ["narik-ngb-radio-group.component.css"],
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
  itemsData: any[] = [];
  _layoutDirection: "vertical" | "horizontal" = "vertical";

  @Input()
  set layoutDirection(value: "vertical" | "horizontal") {
    this._layoutDirection = value;
  }
  get layoutDirection(): "vertical" | "horizontal" {
    return this._layoutDirection;
  }

  constructor(injector: Injector) {
    super(injector);
  }

  protected useData(data: any[]) {
    this.itemsData = data;
  }
}
