import { NarikInject } from "narik-core";
import { NarikViewField, EntityField } from "narik-infrastructure";

import {
  Injector,
  Input,
  ViewChildren,
  QueryList,
  ViewContainerRef,
  OnInit
} from "@angular/core";

import { DynamicFormService } from "../services/dynamic-form.service";
import { NgModel } from "@angular/forms";
import { Observable, ReplaySubject } from "rxjs";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { evalStringExpression } from "narik-common";
import { NarikUiComponent } from "../base/narik-ui-component";

export class NarikDynamicForm extends NarikUiComponent implements OnInit {
  readonly expressionPrefix = "$$$narik";

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
  _models: NgModel[];

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

    this._models = modelArray;
    this._modelsChangedSubject.next({
      items: this._models,
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
  }
  get model(): any {
    return this._model;
  }

  @NarikInject(DynamicFormService)
  dynamicFormService: DynamicFormService;

  constructor(injector: Injector, viewContainerRef: ViewContainerRef) {
    super(injector);

    const dd = injector.get(ViewContainerRef);
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
