import { Component, forwardRef, Injector, Input, HostBinding } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  NarikRadioGroup,
  NARIK_DATA_DISPLAY_VALUE_INPUTS
} from "narik-ui-core";

@Component({
  selector: "narik-dev-radio-group , narik-radio-group",
  templateUrl: "narik-dev-radio-group.component.html",
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikDevRadioGroup),
      multi: true
    }
  ]
})
export class NarikDevRadioGroup extends NarikRadioGroup {
  _cssClass: string;
  itemsData: any[] = [];
  _layoutDirection: "vertical" | "horizental" = "vertical";

  @HostBinding("class")
  class = "dx-field display-block";

  @Input()
  set layoutDirection(value: "vertical" | "horizental") {
    this._layoutDirection = value;
  }
  get layoutDirection(): "vertical" | "horizental" {
    return this._layoutDirection;
  }

  @Input()
  set cssClass(value: string) {
    this._cssClass = value;
  }
  get cssClass(): string {
    return this._cssClass;
  }

  constructor(injector: Injector) {
    super(injector);
  }

  protected useData(data: any[]) {
    this.itemsData = data;
  }
}
