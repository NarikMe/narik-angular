import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef, Component, Injector } from '@angular/core';
import { NarikDatePicker } from '@narik/ui-core';
import { NARIK_DATE_PICKER_INPUTS } from '../input-output-items';

@Component({
    selector: 'narik-ngb-date-picker , narik-date-picker',
    templateUrl: 'narik-ngb-date-picker.component.html',
    inputs: [...NARIK_DATE_PICKER_INPUTS],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NarikNgbDatePicker),
            multi: true,
        },
    ],
})
export class NarikNgbDatePicker extends NarikDatePicker {
    constructor(injector: Injector) {
        super(injector);
    }
}
