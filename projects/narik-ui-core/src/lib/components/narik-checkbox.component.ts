import { Input } from '@angular/core';
import {
  NarikFormComponent,
  NARIK_UI_FORM_INPUTS,
} from '../base/narik-form-component';
export abstract class NarikCheckBox extends NarikFormComponent {
  _tag: any;

  @Input()
  set tag(value: any) {
    this._tag = value;
  }
  get tag(): any {
    return this._tag;
  }
}

export const NARIK_CHECKBOX_INPUTS: string[] = ['tag', ...NARIK_UI_FORM_INPUTS];
