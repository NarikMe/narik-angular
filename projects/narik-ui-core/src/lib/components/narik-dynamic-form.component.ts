import { Subscription } from "rxjs/internal/Subscription";
import { NarikInject } from "narik-core";
import { NarikViewField, EntityField } from "narik-infrastructure";

import {
  Injector,
  Input,
  ViewChildren,
  QueryList,
  ViewContainerRef,
  OnInit,
  Output,
  EventEmitter
} from "@angular/core";

import { DynamicFormService } from "../services/dynamic-form.service";
import { NgModel } from "@angular/forms";
import { Observable, ReplaySubject } from "rxjs";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { evalStringExpression } from "narik-common";
import { NarikUiComponent } from "../base/narik-ui-component";
import { takeWhile } from "rxjs/internal/operators/takeWhile";

export class NarikDynamicForm extends NarikUiComponent implements OnInit {
  readonly expressionPrefix = "$$$narik";
  customFormComponentKeys: string[] = [];
  customFormComponentKeysObject: any = {};

  invisibleItems: any = {};
  disableItems: any = {};
  private _lastModelNames = [];

  @Input()
  activeTabGuard = true;

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
  private _models = new Map<string, { model: NgModel; sub: Subscription }>();

  private _lastModelValues = new Map<string, any>();

  @Output()
  formValueChanged = new EventEmitter<any>();

  @Output()
  modelChange = new EventEmitter<any>();

  private _modelsChangedSubject = new ReplaySubject<{
    items: NgModel[];
    removed: string[];
  }>(1);

  get modelsChaned(): Observable<{ items: NgModel[]; removed: string[] }> {
    return this._modelsChangedSubject.asObservable();
  }

  @ViewChildren(NgModel)
  set models(value: QueryList<NgModel>) {
    const modelArray = value.toArray();
    const modelNameArray = modelArray.map(t => t.name);
    const removed = this._lastModelNames.filter(
      x => modelNameArray.indexOf(x) < 0
    );
    this._lastModelNames = modelNameArray;

    this.manupulateModels(modelArray, removed);

    this._modelsChangedSubject.next({
      items: modelArray,
      removed: removed
    });
  }

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
    this.modelChange.emit(this._model);
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
    if (viewContainerRef && viewContainerRef["_view"]) {
      this.host = viewContainerRef["_view"].component;
    }
  }

  ngOnInit() {
    if (this.host && this.host.change) {
      this.host.change.pipe(debounceTime(100)).subscribe(x => {
        this.applyContextExpressions();
      });
    }
  }

  manupulateModels(modelArray: NgModel[], removed: string[]) {
    for (const model of modelArray) {
      if (!this._models.has(model.name)) {
        const sub = model.update
          .pipe(
            takeWhile(() => this.isAlive),
            debounceTime(100)
          )
          .subscribe(newValue => {
            this.formValueChanged.emit({
              name: model.name,
              newValue,
              oldValue: this._lastModelValues.get(model.name)
            });
            this._lastModelValues.set(model.name, newValue);
          });
        this._models.set(model.name, {
          model: model,
          sub: sub
        });
      }
    }
    for (const item of removed) {
      const removeItem = this._models.get(item);
      if (removeItem) {
        removeItem.sub.unsubscribe();
        this._models.delete(item);
      }
    }
  }
  initExpression(fields: NarikViewField[] | EntityField[]) {
    for (const field of fields) {
      field.hideExpr = field.hideExpr
        ? evalStringExpression(field.hideExpr, ["host"])
        : null;
      field.disableExpr = field.disableExpr
        ? evalStringExpression(field.disableExpr, ["host"])
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
      if (!key.startsWith("$$$") && obj.hasOwnProperty(key)) {
        obj[key] = obj[this.expressionPrefix + key].apply(null, [this.host]);
      }
    }
  }
}
