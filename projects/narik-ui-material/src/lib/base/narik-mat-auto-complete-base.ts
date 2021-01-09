import { Mixin } from '@narik/common';
import { NarikAutoComplete } from '@narik/ui-core';

import { NarikMatFormFieldInput } from './narik-mat-form-field';

export interface INarikMatAutoCompleteBase
    extends NarikMatFormFieldInput,
        NarikAutoComplete {}

export class NarikMatAutoCompleteBase extends Mixin<INarikMatAutoCompleteBase>(
    NarikAutoComplete,
    NarikMatFormFieldInput
) {}
{
}
