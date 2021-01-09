import {
    Component,
    forwardRef,
    Injector,
    OnInit,
    HostBinding,
    Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NarikSelect } from '@narik/ui-core';
import {
    NARIK_DATA_DISPLAY_VALUE_INPUTS,
    NARIK_SELECT_INPUTS,
    NARIK_DATA_DISPLAY_VALUE_OUTPUTS,
} from '../input-output-items';

@Component({
    selector: 'narik-nb-select , narik-select',
    templateUrl: 'narik-nb-select.component.html',
    styleUrls: ['narik-nb-select.component.css'],
    inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS, ...NARIK_SELECT_INPUTS],
    outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NarikNebularSelect),
            multi: true,
        },
    ],
})
export class NarikNebularSelect extends NarikSelect implements OnInit {
    optionData: any[] = [];
    @Input()
    icon: any;

    constructor(injector: Injector) {
        super(injector);
    }

    protected useData(data: any[]) {
        this.optionData = data;
    }
}
