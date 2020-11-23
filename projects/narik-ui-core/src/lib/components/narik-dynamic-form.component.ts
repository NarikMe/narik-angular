import { NarikInject } from '@narik/core';
import {
  NarikViewField,
  EntityField,
  CommandHost,
} from '@narik/infrastructure';

import { Injector, Input, ViewContainerRef, OnInit } from '@angular/core';

import { DynamicFormService } from '../services/dynamic-form.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { evalStringExpression, getParnetComponent } from '@narik/common';
import { NarikUiComponent } from '../base/narik-ui-component';

export class NarikDynamicForm extends NarikUiComponent implements OnInit {
  readonly expressionPrefix = '$$$narik';
  customFormComponentKeys: string[] = [];
  customFormComponentKeysObject: any = {};

  invisibleItems: any = {};
  disableItems: any = {};

  @Input()
  activeTabGuard = true;

  @Input()
  form: FormGroup;

  @Input()
  activeAutoFocus = true;

  @Input()
  defaultFocusField: string;

  @Input()
  columnsCount = 1;

  @Input()
  groupFields = false;

  @Input()
  layoutGap = 5;

  @Input()
  host: any;

  _model: any;
  _fields: NarikViewField[] | EntityField[];

  @Input()
  set fields(value: NarikViewField[] | EntityField[]) {
    this._fields = this.dynamicFormService.initDynamicFormFields(value);
    this.initExpression(this.fields);
  }
  get fields(): NarikViewField[] | EntityField[] {
    return this._fields;
  }

  @Input()
  set model(value: any) {
    this._model = this.dynamicFormService.initDynamicFormModel(value);
  }
  get model(): any {
    return this._model;
  }

  @NarikInject(DynamicFormService)
  dynamicFormService: DynamicFormService;

  constructor(injector: Injector, viewContainerRef: ViewContainerRef) {
    super(injector);

    this.customFormComponentKeys = this.dynamicFormService.getDynamicFormComponentKeys();
    for (const item of this.customFormComponentKeys) {
      this.customFormComponentKeysObject[
        item
      ] = this.dynamicFormService.getDynamicFormComponent(item);
    }
    if (viewContainerRef) {
      this.host = getParnetComponent<CommandHost>(viewContainerRef);
    }
  }

  ngOnInit() {
    if (this.host && this.host.change) {
      this.host.change.pipe(debounceTime(100)).subscribe(() => {
        this.applyContextExpressions();
      });
    }
  }

  initExpression(fields: NarikViewField[] | EntityField[]) {
    for (const field of fields) {
      field.hideExpr = field.hideExpr
        ? evalStringExpression(field.hideExpr, ['host'])
        : null;
      field.disableExpr = field.disableExpr
        ? evalStringExpression(field.disableExpr, ['host'])
        : null;

      if (field.disableExpr) {
        this.disableItems[field.name] = false;
        this.disableItems[this.expressionPrefix + field.name] =
          field.disableExpr;
      }
      if (field.hideExpr) {
        this.invisibleItems[field.name] = false;
        this.invisibleItems[this.expressionPrefix + field.name] =
          field.hideExpr;
      }
    }
  }
  applyContextExpressions(): any {
    this.applyExpressionsOnObject(this.invisibleItems);
    this.applyExpressionsOnObject(this.disableItems);
  }

  applyExpressionsOnObject(obj: any) {
    for (const key in obj) {
      if (!key.startsWith('$$$') && obj.hasOwnProperty(key)) {
        obj[key] = obj[this.expressionPrefix + key].apply(null, [this.host]);
      }
    }
  }
}
