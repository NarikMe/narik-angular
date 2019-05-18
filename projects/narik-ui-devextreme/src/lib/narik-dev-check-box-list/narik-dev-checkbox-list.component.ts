import {
  NarikCheckBoxList,
  NARIK_DATA_DISPLAY_VALUE_INPUTS
} from "narik-ui-core";
import { Component, forwardRef, Injector, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "narik-dev-checkbox-list , narik-checkbox-list",
  templateUrl: "narik-dev-checkbox-list.component.html",
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikDevCheckBoxList),
      multi: true
    }
  ]
})
export class NarikDevCheckBoxList extends NarikCheckBoxList {
  itemsData: any[] = [];
  _cssClass: string;
  _layoutDirection: "vertical" | "horizontal" = "vertical";

  @Input()
  set layoutDirection(value: "vertical" | "horizontal") {
    this._layoutDirection = value;
  }
  get layoutDirection(): "vertical" | "horizontal" {
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
