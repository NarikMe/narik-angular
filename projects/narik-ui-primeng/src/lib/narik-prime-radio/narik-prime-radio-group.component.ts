import {
  Component,
  forwardRef,
  Injector,
  Input
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NarikRadioGroup } from "narik-ui-core";
import { NARIK_DATA_DISPLAY_VALUE_INPUTS } from "../input-output-items";

@Component({
  selector: "narik-prime-radio-group , narik-radio-group",
  templateUrl: "narik-prime-radio-group.component.html",
  styleUrls: ["narik-prime-radio-group.component.css"],
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikPrimeRadioGroup),
      multi: true
    }
  ]
})
export class NarikPrimeRadioGroup extends NarikRadioGroup {
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
