import { NarikInput } from '@narik/ui-core';

import {
    Component,
    forwardRef,
    Injector,
    HostBinding,
    Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NARIK_INPUT_INPUTS } from '../input-output-items';

@Component({
    selector: 'narik-swimlane-input , narik-input',
    templateUrl: 'narik-swimlane-input.component.html',
    inputs: [...NARIK_INPUT_INPUTS],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NarikSwimlaneInput),
            multi: true,
        },
    ],
})
export class NarikSwimlaneInput extends NarikInput {
    _icon: string;
    @Input()
    set icon(value: string) {
        this._icon = value;
    }
    get icon(): string {
        return this._icon;
    }

    constructor(injector: Injector) {
        super(injector);
    }
}
