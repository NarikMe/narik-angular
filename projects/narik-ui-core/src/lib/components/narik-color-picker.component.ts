import {
    NarikFormComponent,
    NARIK_UI_FORM_INPUTS,
} from './../base/narik-form-component';
import { Injector } from '@angular/core';

export class NarikColorPickerInput extends NarikFormComponent {
    constructor(injector: Injector) {
        super(injector);
    }
}

export const NARIK_COLOR_PICKER_INPUTS: string[] = [...NARIK_UI_FORM_INPUTS];
