import { Mixin } from '@narik/common';
import { NarikSelect } from '@narik/ui-core';

import { NarikMatFormFieldInput } from './narik-mat-form-field';

export interface INarikMatSelectBase
  extends NarikMatFormFieldInput,
    NarikSelect {}

export class NarikMatSelectBase extends Mixin<INarikMatSelectBase>(
  NarikSelect,
  NarikMatFormFieldInput
) {}
{
}
