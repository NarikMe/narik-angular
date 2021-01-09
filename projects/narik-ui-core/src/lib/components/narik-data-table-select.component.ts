import { OnInit, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { NarikSelect, NARIK_SELECT_INPUTS } from './narik-select.component';

export class NarikDataTableSelect
    extends NarikSelect
    implements ControlValueAccessor, OnInit {
    _gridOptions: any;
    get uiKey(): string {
        return 'data-table-select';
    }

    set gridOptions(value: any) {
        this._gridOptions = value;
    }
    get gridOptions(): any {
        return this._gridOptions;
    }
}

export const NARIK_DATA_TABLE_SELECT_INPUTS: string[] = [
    ...NARIK_SELECT_INPUTS,
    'gridOptions',
];
