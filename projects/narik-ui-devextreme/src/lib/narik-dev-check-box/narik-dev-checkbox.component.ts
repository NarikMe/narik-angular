import { NarikCheckBox } from "@narik/ui-core";

import { Input, Component, forwardRef, HostBinding, Injector } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NARIK_CHECKBOX_INPUTS } from "../input-output-items";

@Component({
  selector: "narik-dev-checkbox , narik-checkbox",
  templateUrl: "narik-dev-checkbox.component.html",
  inputs: [...NARIK_CHECKBOX_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikDevCheckBox),
      multi: true
    },
    {
      provide: NarikCheckBox,
      useExisting: forwardRef(() => NarikDevCheckBox)
    }
  ]
})
export class NarikDevCheckBox extends NarikCheckBox {
  _cssClass: string;
  _labelPosition: "before" | "after";
  _indeterminate: boolean;
  _color: "primary" | "warn";
  _text: string;

  @Input()
  set text(value: string) {
    this._text = value;
  }
  get text(): string {
    return this._text;
  }
  @Input()
  set color(value: "primary" | "warn") {
    this._color = value;
  }
  get color(): "primary" | "warn" {
    return this._color;
  }

  @Input()
  set indeterminate(value: boolean) {
    this._indeterminate = value;
  }
  get indeterminate(): boolean {
    return this._indeterminate;
  }

  @Input()
  set labelPosition(value: "before" | "after") {
    this._labelPosition = value;
  }
  get labelPosition(): "before" | "after" {
    return this._labelPosition;
  }

  @Input()
  set cssClass(value: string) {
    this._cssClass = value;
  }
  get cssClass(): string {
    return this._cssClass;
  }

  @HostBinding("class")
  class = "dx-field display-block";

  constructor(injector: Injector) {
    super(injector);
  }
}
