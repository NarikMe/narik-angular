import {
    Component,
    forwardRef,
    Injector,
    Input,
    HostBinding,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NarikRadioGroup } from '@narik/ui-core';
import { NARIK_DATA_DISPLAY_VALUE_INPUTS } from '../input-output-items';

@Component({
    selector: 'narik-dev-radio-group , narik-radio-group',
    templateUrl: 'narik-dev-radio-group.component.html',
    inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NarikDevRadioGroup),
            multi: true,
        },
    ],
})
export class NarikDevRadioGroup extends NarikRadioGroup {
    _cssClass: string;
    itemsData: any[] = [];
    _layoutDirection: 'vertical' | 'horizontal' = 'vertical';

    @HostBinding('class')
    class = 'dx-field display-block';

    @Input()
    set layoutDirection(value: 'vertical' | 'horizontal') {
        this._layoutDirection = value;
    }
    get layoutDirection(): 'vertical' | 'horizontal' {
        return this._layoutDirection;
    }

    @Input()
    set cssClass(value: string) {
        this._cssClass = value;
    }
    get cssClass(): string {
        return this._cssClass;
    }

    constructor(injector: Injector) {
        super(injector);
    }

    protected useData(data: any[]) {
        this.itemsData = data;
    }
}
