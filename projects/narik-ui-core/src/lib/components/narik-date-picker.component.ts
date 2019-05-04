import { isString } from "narik-common";
import {
  NarikFormComponent,
  NARIK_UI_FORM_INPUTS
} from "../base/narik-form-component";

export class NarikDatePicker extends NarikFormComponent {
  protected convertValue(value) {
    if (value && isString(value)) {
      return new Date(value);
    }
    return value;
  }
}

export const NARIK_DATE_PICKER_INPUTS: string[] = [...NARIK_UI_FORM_INPUTS];
