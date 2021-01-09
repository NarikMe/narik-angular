import { NarikCheckBoxList } from '@narik/ui-core';
import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NARIK_DATA_DISPLAY_VALUE_INPUTS } from '../input-output-items';

@Component({
    selector: 'narik-ngb-checkbox-list , narik-checkbox-list',
    templateUrl: 'narik-ngb-checkbox-list.component.html',
    styleUrls: ['narik-ngb-checkbox-list.component.css'],
    inputs: [...NARIK_DATA_DISPLAY_VALUE_INPUTS],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NarikNgbCheckBoxList),
            multi: true,
        },
    ],
})
export class NarikNgbCheckBoxList extends NarikCheckBoxList {
    itemsData: any[] = [];
    _layoutDirection: 'vertical' | 'horizontal' = 'vertical';

    @Input()
    set layoutDirection(value: 'vertical' | 'horizontal') {
        this._layoutDirection = value;
    }
    get layoutDirection(): 'vertical' | 'horizontal' {
        return this._layoutDirection;
    }

    constructor(injector: Injector) {
        super(injector);
    }

    protected useData(data: any[]) {
        this.itemsData = data;
    }
}
