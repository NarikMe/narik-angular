import { NarikCheckBox } from '@narik/ui-core';

import { Input, Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NARIK_CHECKBOX_INPUTS } from '../input-output-items';

@Component({
    selector: 'narik-mat-checkbox , narik-checkbox',
    templateUrl: 'narik-mat-checkbox.component.html',
    inputs: [...NARIK_CHECKBOX_INPUTS],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NarikMatCheckBox),
            multi: true,
        },
        {
            provide: NarikCheckBox,
            useExisting: forwardRef(() => NarikMatCheckBox),
        },
    ],
})
export class NarikMatCheckBox extends NarikCheckBox {
    _cssClass: string;
    _labelPosition: 'before' | 'after';
    _indeterminate: boolean;
    _color: 'primary' | 'warn' | 'accent' = 'primary';

    @Input()
    set color(value: 'primary' | 'warn' | 'accent') {
        this._color = value;
    }
    get color(): 'primary' | 'warn' | 'accent' {
        return this._color;
    }

    @Input()
    set indeterminate(value: boolean) {
        this._indeterminate = value;
    }
    get indeterminate(): boolean {
        return this._indeterminate;
    }

    @Input()
    set labelPosition(value: 'before' | 'after') {
        this._labelPosition = value;
    }
    get labelPosition(): 'before' | 'after' {
        return this._labelPosition;
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
}
