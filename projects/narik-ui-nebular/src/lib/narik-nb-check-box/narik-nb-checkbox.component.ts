import { NarikCheckBox } from '@narik/ui-core';

import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NARIK_CHECKBOX_INPUTS } from '../input-output-items';

@Component({
    selector: 'narik-nb-checkbox , narik-checkbox',
    templateUrl: 'narik-nb-checkbox.component.html',
    inputs: [...NARIK_CHECKBOX_INPUTS],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NarikNebularCheckBox),
            multi: true,
        },
        {
            provide: NarikCheckBox,
            useExisting: forwardRef(() => NarikNebularCheckBox),
        },
    ],
})
export class NarikNebularCheckBox extends NarikCheckBox {
    constructor(injector: Injector) {
        super(injector);
    }
}
