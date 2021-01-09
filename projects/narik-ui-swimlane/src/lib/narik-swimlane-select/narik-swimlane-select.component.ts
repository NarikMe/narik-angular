import {
    Component,
    forwardRef,
    Injector,
    OnInit,
    HostBinding,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NarikSelect } from '@narik/ui-core';
import {
    NARIK_DATA_DISPLAY_VALUE_INPUTS,
    NARIK_SELECT_INPUTS,
    NARIK_DATA_DISPLAY_VALUE_OUTPUTS,
} from '../input-output-items';

@Component({
    selector: 'narik-swimlane-select , narik-select',
    templateUrl: 'narik-swimlane-select.component.html',
    styleUrls: ['narik-swimlane-select.component.css'],
    inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS, ...NARIK_SELECT_INPUTS],
    outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NarikSwimlaneSelect),
            multi: true,
        },
    ],
})
export class NarikSwimlaneSelect extends NarikSelect implements OnInit {
    optionData: any[] = [];

    constructor(injector: Injector) {
        super(injector);
    }

    protected useData(data: any[]) {
        this.optionData = data;
    }
}
