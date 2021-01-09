import { OnInit, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { NarikDataDisplayValueComponent } from '../base/narik-data-display-value-component';

export class NarikAutoComplete
    extends NarikDataDisplayValueComponent
    implements ControlValueAccessor, OnInit {
    @Input()
    displayText: string;

    @Input()
    minSearchLength = 0;

    @Input()
    isLazyLoadData = false;

    protected useData(data: any[]) {
        throw new Error('Subclass Must Override useData.');
    }
}

export const NARIK_AUTOCOMPLETE_INPUTS: string[] = [
    'displayText',
    'minSearchLength',
    'isLazyLoadData',
];
