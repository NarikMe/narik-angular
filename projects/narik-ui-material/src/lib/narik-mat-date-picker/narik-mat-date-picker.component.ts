import { NG_VALUE_ACCESSOR } from "@angular/forms";
import {
  forwardRef,
  Component,
  Injector,
  Inject,
  Optional
} from "@angular/core";

import { NARIK_MAT_FORM_INPUTS } from "../base/narik-mat-form-field";
import { NarikMatDatePickerBase } from "../base/narik-mat-date-picker-base";
import {
  DateAdapter,
  MatDateFormats,
  MAT_DATE_FORMATS
} from "@angular/material/core";
import { NARIK_DATE_PICKER_INPUTS } from "../input-output-items";



@Component({
  selector: "narik-mat-date-picker , narik-date-picker",
  templateUrl: "narik-mat-date-picker.component.html",
  inputs: [...NARIK_MAT_FORM_INPUTS, ...NARIK_DATE_PICKER_INPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikMatDatePicker),
      multi: true
    }
  ]
})
export class NarikMatDatePicker extends NarikMatDatePickerBase {
  mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/]
  };

  internalChange = false;
  internalChange2 = false;
  _textValue: string;
  set textValue(value: string) {
    if (value !== this._textValue) {
      this._textValue = value;
      if (!this.internalChange) {
        const dateValue = this.adapter.parse(
          this.textValue,
          this.dateFormats.parse.dateInput
        );
        this.internalChange2 = true;
        if (dateValue && this.adapter.isValid(dateValue)) {
          this.value = dateValue;
        } else {
          this.value = undefined;
        }
        this.internalChange2 = false;
      }
    }
  }
  get textValue(): string {
    return this._textValue;
  }

  constructor(
    injector: Injector,
    private adapter: DateAdapter<any>,
    @Optional() @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats
  ) {
    super(injector);
  }

  todate(value) {
    this.textValue = value;
  }

  onBlur(event) {
    this.onModelChange(this.value);
    super.onBlur(event);
  }

  protected valueChanged(newValue, oldValue) {
    if (!this.internalChange2) {
      this.internalChange = true;
      this.textValue = this.value
        ? this.adapter.format(this.value, this.dateFormats.display.dateInput)
        : "";
      this.internalChange = false;
    }
  }

  protected convertValue(value) {
    return this.adapter.deserialize(value);
  }
}
