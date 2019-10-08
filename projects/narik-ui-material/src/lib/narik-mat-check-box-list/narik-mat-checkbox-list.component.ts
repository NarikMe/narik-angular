import {
  NarikCheckBoxList
} from "narik-ui-core";
import { Component, forwardRef, Injector, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { FORM_ITEM_DEFAULT_CLASS } from "../injectionTokens";
import { NARIK_DATA_DISPLAY_VALUE_INPUTS } from "../input-output-items";

@Component({
  selector: "narik-mat-checkbox-list , narik-checkbox-list",
  templateUrl: "narik-mat-checkbox-list.component.html",
  inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikMatCheckBoxList),
      multi: true
    }
  ]
})
export class NarikMatCheckBoxList extends NarikCheckBoxList {
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
    const _defaultFormItemClass = injector.get(FORM_ITEM_DEFAULT_CLASS, null);
    if (_defaultFormItemClass) {
      this.cssClass = _defaultFormItemClass;
    }
  }

  protected useData(data: any[]) {
    this.itemsData = data;
  }
}
