import {
  NarikDataOrientedComponent,
  NARIK_DATA_ORIENTED_INPUTS,
  NARIK_DATA_ORIENTED_OUTPUTS,
} from './narik-data-oriented-component';
import { Input, Injector } from '@angular/core';
import { DEFAULT_VALUE_DISPLAY_FIELD_NAMES } from './../injectionTokens';
import { isArray } from '@narik/common';

export abstract class NarikDataDisplayValueComponent extends NarikDataOrientedComponent {
  _displayField: string;
  _valueField: string;

  @Input()
  set valueField(value: string) {
    this._valueField = value;
  }
  get valueField(): string {
    return this._valueField;
  }

  @Input()
  set displayField(value: string) {
    this._displayField = value;
  }
  get displayField(): string {
    return this._displayField;
  }

  constructor(injector: Injector) {
    super(injector);

    const defaultFieldNames = injector.get(DEFAULT_VALUE_DISPLAY_FIELD_NAMES, {
      valueField: 'id',
      displayField: 'title',
    });
    this.displayField = defaultFieldNames.displayField;
    this.valueField = defaultFieldNames.valueField;

    this.dataChange.subscribe((x) => {
      if (this.value) {
        this.checkRaiseselectedItemChange(this.value);
      }
    });
  }

  protected valueChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      if (newValue) {
        this.checkRaiseselectedItemChange(newValue);
      } else {
        this.selectedItemChange.emit(null);
      }
    }
  }

  private checkRaiseselectedItemChange(value) {
    if (isArray(this.dataSource)) {
      const item = this.dataSource.filter(
        (x) => x[this.valueField] === value
      )[0];
      this.selectedItemChange.emit(item);
    }
  }
}

export const NARIK_DATA_DISPLAY_VALUE_OUTPUTS: string[] = [
  ...NARIK_DATA_ORIENTED_OUTPUTS,
];

export const NARIK_DATA_DISPLAY_VALUE_INPUTS: string[] = [
  'displayField',
  'valueField',
  ...NARIK_DATA_ORIENTED_INPUTS,
];
