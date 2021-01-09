import { NarikCheckBoxList } from '@narik/ui-core';
import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NARIK_DATA_DISPLAY_VALUE_INPUTS } from '../input-output-items';

@Component({
    selector: 'narik-ngx-checkbox-list , narik-checkbox-list',
    templateUrl: 'narik-ngx-checkbox-list.component.html',
    inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NarikNgxCheckBoxList),
            multi: true,
        },
    ],
})
export class NarikNgxCheckBoxList extends NarikCheckBoxList {
    constructor(injector: Injector) {
        super(injector);
    }
}
