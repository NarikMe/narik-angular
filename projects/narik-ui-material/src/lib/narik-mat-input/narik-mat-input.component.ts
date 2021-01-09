import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { NARIK_MAT_FORM_INPUTS } from '../base/narik-mat-form-field';
import { NarikMatInputBase } from '../base/narik-mat-input-base';
import { NARIK_INPUT_INPUTS } from '../input-output-items';

@Component({
    selector: 'narik-mat-input , narik-input',
    templateUrl: 'narik-mat-input.component.html',
    inputs: [...NARIK_MAT_FORM_INPUTS, ...NARIK_INPUT_INPUTS],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NarikMatInput),
            multi: true,
        },
    ],
})
export class NarikMatInput extends NarikMatInputBase {
    @Input()
    inputCssClass: string;
    constructor(injector: Injector) {
        super(injector);
    }
}
