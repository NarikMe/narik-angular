import { NarikInject } from '@narik/core';
import {
  NarikViewField,
  EntityField,
  FormHost,
  HOST_TOKEN,
  IsHost,
} from '@narik/infrastructure';

import { Injector, Input, OnInit, ViewContainerRef } from '@angular/core';

import { DynamicFormService } from '../services/dynamic-form.service';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { evalStringExpression, getParentComponent } from '@narik/common';
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
  host: FormHost;

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

    this.host = injector.get(HOST_TOKEN, null);

    if (!this.host && viewContainerRef) {
      this.host = getParentComponent<FormHost>(viewContainerRef);
    }
  }

  ngOnInit() {
    if (IsHost(this.host)) {
      this.host.change$.pipe(debounceTime(100)).subscribe(() => {
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
    const disableItems = { ...this.disableItems };
    this.applyExpressionsOnObject(this.disableItems);

    for (const key in this.disableItems) {
      if (
        !key.startsWith('$$$') &&
        Object.prototype.hasOwnProperty.call(this.disableItems, key)
      ) {
        if (disableItems[key] !== this.disableItems[key]) {
          const formControl = this.form?.get(key);
          if (this.disableItems[key] === false) {
            formControl?.enable();
          } else {
            formControl?.disable();
          }
        }
      }
    }
  }

  applyExpressionsOnObject(obj: any) {
    for (const key in obj) {
      if (!key.startsWith('$$$') && obj.hasOwnProperty(key)) {
        obj[key] = obj[this.expressionPrefix + key].apply(null, [this.host]);
      }
    }
  }
}
