import { MetaDataService, MODULE_UI_KEY } from '@narik/infrastructure';
import { NarikInject } from '@narik/core';
import { FORM_ITEM_DEFAULT_CLASS } from './../injectionTokens';
import { Input, Injector } from '@angular/core';

import {
  FloatLabelType,
  MatFormFieldAppearance,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';

export class NarikMatFormFieldInput {
  _cssClass: string;
  _floatLabel: FloatLabelType = 'auto';
  _appearance: MatFormFieldAppearance;
  _hintLabel: string;
  _suffixIcon: string;
  _startHint: any;
  _endHint: any;
  _suffixContent: any;
  _prefixContent: any;
  _prefixIcon: any;

  displayErrorMode: 'hint' | 'icon' | 'none' = 'icon';

  @Input()
  set prefixIcon(value: any) {
    this._prefixIcon = value;
  }
  get prefixIcon(): any {
    return this._prefixIcon;
  }

  @Input()
  set prefixContent(value: any) {
    this._prefixContent = value;
  }
  get prefixContent(): any {
    return this._prefixContent;
  }

  @Input()
  set suffixContent(value: any) {
    this._suffixContent = value;
  }
  get suffixContent(): any {
    return this._suffixContent;
  }

  @Input()
  set endHint(value: any) {
    this._endHint = value;
  }
  get endHint(): any {
    return this._endHint;
  }

  @Input()
  set startHint(value: any) {
    this._startHint = value;
  }
  get startHint(): any {
    return this._startHint;
  }

  @Input()
  set suffixIcon(value: string) {
    this._suffixIcon = value;
  }

  get suffixIcon(): string {
    return this._suffixIcon;
  }

  @Input()
  set hintLabel(value: string) {
    this._hintLabel = value;
  }
  get hintLabel(): string {
    return this._hintLabel;
  }

  @Input()
  set appearance(value: MatFormFieldAppearance) {
    this._appearance = value;
  }
  get appearance(): MatFormFieldAppearance {
    return this._appearance;
  }

  @Input()
  set floatLabel(value: FloatLabelType) {
    this._floatLabel = value;
  }
  get floatLabel(): FloatLabelType {
    return this._floatLabel;
  }

  @Input()
  set cssClass(value: string) {
    this._cssClass = value;
  }
  get cssClass(): string {
    return this._cssClass;
  }

  constructor(injector: Injector) {
    // const _defaultLabelOption = injector.get(MAT_LABEL_GLOBAL_OPTIONS, null);

    const _defaultFormItemClass = injector.get(FORM_ITEM_DEFAULT_CLASS, null);
    const _defaults = injector.get(MAT_FORM_FIELD_DEFAULT_OPTIONS, null);

    if (_defaultFormItemClass) {
      this.cssClass = _defaultFormItemClass;
    }
    this.appearance =
      _defaults && _defaults.appearance ? _defaults.appearance : 'legacy';

    this.floatLabel =
      _defaults && _defaults.floatLabel ? _defaults.floatLabel : 'auto';

    const metaDataService = injector.get(MetaDataService, undefined);
    const containerModuleKey = injector.get(MODULE_UI_KEY, 'narik');

    const dfOptions = metaDataService.getInformation<any>(
      'uiDefaultOptions',
      containerModuleKey,
      'form-field'
    );

    if (dfOptions && dfOptions.value && dfOptions.value.displayErrorMode) {
      this.displayErrorMode = dfOptions.value.displayErrorMode;
    }
  }
}

export const NARIK_MAT_FORM_INPUTS: string[] = [
  'prefixIcon',
  'prefixContent',
  'suffixContent',
  'endHint',
  'startHint',
  'cssClass',
  'floatLabel',
  'appearance',
  'hintLabel',
  'suffixIcon',
];
