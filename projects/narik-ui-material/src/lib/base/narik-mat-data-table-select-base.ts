import { Mixin } from "@narik/common";
import { NarikDataTableSelect } from "@narik/ui-core";

import { NarikMatFormFieldInput } from "./narik-mat-form-field";

export interface INarikMatDataTableSelectBase
  extends NarikMatFormFieldInput,
    NarikDataTableSelect {}

export class NarikMatDataTableSelectBase extends Mixin<
  INarikMatDataTableSelectBase
>(NarikDataTableSelect, NarikMatFormFieldInput) {}
{
}
