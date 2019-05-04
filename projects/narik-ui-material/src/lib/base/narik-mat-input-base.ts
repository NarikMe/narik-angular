import { Mixin } from "narik-common";
import { NarikInput } from "narik-ui-core";

import { NarikMatFormFieldInput } from "./narik-mat-form-field";

export interface INarikMatInputBase
  extends NarikMatFormFieldInput,
    NarikInput {}

export class NarikMatInputBase extends Mixin<INarikMatInputBase>(
  NarikMatFormFieldInput,
  NarikInput
) {}
