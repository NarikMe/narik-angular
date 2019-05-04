import { Mixin } from "narik-common";
import { NarikDatePicker } from "narik-ui-core";

import { NarikMatFormFieldInput } from "./narik-mat-form-field";

export interface INarikMatDatePickerBase
  extends NarikMatFormFieldInput,
    NarikDatePicker {}

export class NarikMatDatePickerBase extends Mixin<INarikMatDatePickerBase>(
  NarikMatFormFieldInput,
  NarikDatePicker
) {}
{
}
