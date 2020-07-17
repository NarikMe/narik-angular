import {
  ElementRef,
  Injector,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from "@angular/core";
import {
  NgForm,
  NgModel,
  FormGroup,
  FormControl,
  FormBuilder,
} from "@angular/forms";
import {
  formatString,
  isEquivalent,
  isFunction,
  isObject,
  isPresent,
} from "@narik/common";
import { NarikInject } from "@narik/core";
import {
  CommandInfo,
  ConfigService,
  DialogResult,
  DialogService,
  EntityTypeService,
  NarikEntity,
  NarikViewField,
  MetaDataService,
  MODULE_UI_KEY,
} from "@narik/infrastructure";
import { DynamicFormService, NarikDynamicForm } from "@narik/ui-core";
import { TranslateService } from "@ngx-translate/core";
import { validate, ValidationError } from "class-validator";
import { denormalize } from "data-adapter";
import { Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Subscription } from "rxjs";
import { finalize, takeWhile } from "rxjs/operators";
import { EDIT_DEFAULT_VIEW_OPTION } from "../injectionTokens";
import { EditFormConfig } from "../interfaces/form-config.model";
import {
  DefaultEditViewOption,
  EditFormViewOption,
} from "../interfaces/form-view-option.model";
import { ServerResponse } from "../interfaces/server-response.model";
import { StringConstants } from "../util/constants";
import { NarikGeneralForm } from "./narik-general-form";

/**
 * Narik edit form
 */
export abstract class NarikEditForm<TE extends NarikEntity>
  extends NarikGeneralForm<TE>
  implements OnInit {
  private _models = new Map<string, { model: NgModel; sub: Subscription }>();
  private _lastModelNames = [];
  private _lastModelValues = new Map<string, any>();
  private _dynamicForms = new Map<NarikDynamicForm, Subscription>();

  protected entityKeyField: string;
  public isReactiveForm = false;

  formsOptions: any;

  @NarikInject(EDIT_DEFAULT_VIEW_OPTION, DefaultEditViewOption)
  defaultOption: EditFormViewOption;

  @NarikInject(DialogService)
  dialogService: DialogService;

  @NarikInject(ConfigService)
  configService: ConfigService;

  @NarikInject(MetaDataService)
  metaDataService: MetaDataService;

  @NarikInject(MODULE_UI_KEY)
  moduleKey: string;

  @NarikInject(TranslateService)
  translateService: TranslateService;

  @NarikInject(EntityTypeService)
  entityTypeService: EntityTypeService;

  @NarikInject(FormBuilder)
  formBuilder: FormBuilder;

  form: FormGroup = new FormGroup({});
  _ngForm: NgForm;

  @ViewChild(NgForm, { static: false })
  set ngForm(value: NgForm) {
    this._ngForm = value;
    if (value) {
      this.form = value.form;
    }
  }

  get ngForm() {
    return this._ngForm;
  }

  @ViewChild("formElement", { read: ElementRef, static: false })
  formElement: ElementRef;

  _currentEntity: TE = <any>{};
  _config: EditFormConfig;

  fields: NarikViewField[];

  @NarikInject(DynamicFormService)
  dynamicFormService: DynamicFormService;

  @ViewChildren(NarikDynamicForm)
  set dynamicForm(values: QueryList<NarikDynamicForm>) {
    if (values) {
      const valueArray = values.toArray();
      for (const value of valueArray) {
        if (!this._dynamicForms.has(value)) {
          const sub = value.modelsChaned
            .pipe(takeWhile((x) => this.isAlive))
            .subscribe((result) => {
              if (result) {
                this.applyNgModels(result.items, result.removed);
              }
            });
          this._dynamicForms.set(value, sub);
        }
      }
    }
  }

  @ViewChildren(NgModel)
  public set models(value: QueryList<NgModel>) {
    const modelArray = value.toArray();
    const modelNameArray = modelArray.map((t) => t.name);
    const removed = this._lastModelNames.filter(
      (x) => modelNameArray.indexOf(x) < 0
    );
    this.applyNgModels(modelArray, removed);
    this._lastModelNames = modelNameArray;
  }

  set config(value: EditFormConfig) {
    this._config = value;
  }
  get config(): EditFormConfig {
    return this._config;
  }

  set currentEntity(value: TE) {
    if (!isEquivalent(this._currentEntity, value)) {
      const oldValue = this._currentEntity;
      this._currentEntity = value;
      this.currentEntityChanged(oldValue, value);
      this.detectChanges();
    }
  }
  get currentEntity(): TE {
    return this._currentEntity;
  }

  constructor(injector: Injector) {
    super(injector);
    this.entityKeyField =
      this.configService.getConfig("entityKeyField") || "viewModelId";

    this.formsOptions = this.metaDataService.getValue<any>(
      this.moduleKey,
      "formsOptions"
    );

    if (this.formsOptions && isPresent(this.formsOptions.isReactiveForm)) {
      this.isReactiveForm = this.formsOptions.isReactiveForm;
    }
  }

  private applyNgModels(ngModels: NgModel[], removed: string[]) {
    ngModels.forEach((model) => {
      if (!this._models.has(model.name)) {
        this.ngForm.addControl(model);
        const modelName = model.name;
        const sub = model.update
          .pipe(
            takeWhile(() => this.isAlive),
            debounceTime(100)
          )
          .subscribe((newValue) => {
            this.onModelValueChanged(
              modelName,
              newValue,
              this._lastModelValues.get(modelName)
            );
            this.detectChanges();
            this._lastModelValues.set(modelName, newValue);
          });
        this._models.set(model.name, {
          model: model,
          sub: sub,
        });
      }
    });

    for (const item of removed) {
      const removeItem = this._models.get(item);
      if (removeItem) {
        this.ngForm.removeControl(removeItem.model);
        removeItem.sub.unsubscribe();
        this._models.delete(item);
      }
    }
  }
  ngOnInit() {
    this.config =
      this.config ||
      this.parameterResolver.get(StringConstants.Prameter_Config);
    if (this.config && this.config.isDynamic) {
      this.fields = this.dynamicFormService
        .createFieldsFromEntityFields(this.config.fields)
        .filter((x) => x.showInEdit)
        .sort(function (obj1, obj2) {
          return (
            (obj1.orderInEdit || obj1.order) - (obj2.orderInEdit || obj2.order)
          );
        });
    }

    if (isPresent(this.config.isReactiveForm)) {
      this.isReactiveForm = this.config.isReactiveForm;
    }
    if (this.isReactiveForm) {
      this.form = this.createForm();
    }
    this.getOrNewEntity();
    this.detectChanges();
  }

  protected onModelValueChanged(
    modelName: string,
    newValue: any,
    oldValue: any
  ) {}

  showFormErrors(form: FormGroup, formElement: ElementRef) {
    const errors = [];
    for (const key in form.controls) {
      if (form.controls[key].errors) {
        // tslint:disable-next-line:forin
        for (const errKey in form.controls[key].errors) {
          errors.push({
            key: key,
            errKey: errKey,
            errData: form.controls[key].errors[errKey],
          });
        }
      }
    }
    let errMessage = "";
    for (const item of errors) {
      const label =
        formElement && item.key
          ? this.findLabel(formElement, item.key)
          : item.key
          ? this.translateService.instant(item.key)
          : "";
      const errorDataArray = [];
      if (item.errData) {
        for (const key in item.errData) {
          if (item.errData.hasOwnProperty(key)) {
            errorDataArray.push(item.errData[key]);
          }
        }
      }
      errMessage +=
        formatString(
          this.translateService.instant("errors." + item.errKey),
          label,
          ...errorDataArray
        ) + "<br>";
    }
    this.dialogService.error(errMessage, "", {
      enableHtml: true,
    });
  }
  findLabel(formElement: ElementRef, key: string) {
    const element = formElement.nativeElement.querySelector(
      "[narik-form-item-key=" + key + "]"
    );
    if (element) {
      const labelAttr = element.attributes["narik-form-item-label"];
      if (labelAttr) {
        return this.translateService.instant(labelAttr.value);
      }
    }
    return this.translateService.instant(key);
  }

  protected getPostData() {
    const denormalizeEntity = isFunction((this.currentEntity as any).toJson)
      ? (this.currentEntity as any).toJson()
      : denormalize(this.currentEntity);
    return this.addToPostData({ Entity: denormalizeEntity });
  }

  protected addToPostData(postData: any) {
    return postData;
  }
  submit() {
    if (
      this.config.readOnly ||
      (this.config.allowEdit === false &&
        this.currentEntity[this.entityKeyField]) ||
      (this.config.allowNew === false &&
        !this.currentEntity[this.entityKeyField])
    ) {
      return;
    }

    if (this.isReactiveForm) {
      this.currentEntity = { ...this.currentEntity, ...this.form.value };
    }
    this.completeEntityBeforeSubmit(this.currentEntity);

    if (this.form && !this.form.valid) {
      this.form.markAllAsTouched();
      if (this.formElement) {
        this.showFormErrors(this.form, this.formElement);
      } else {
        this.dialogService.error("errors.invalid_form");
      }

      return;
    }

    this.validateEntity(this.currentEntity).then((isOk) => {
      if (isOk) {
        if (!this.extraValidateBeforeSubmit(this.currentEntity)) {
          return;
        }
        this.isBusy = true;
        const postData = this.getPostData();
        this.queryService
          .post(
            {
              dataKey: this.config.entityKey,
              dataMethod: this.currentEntity[this.entityKeyField]
                ? "PUT"
                : "POST",
              urlParameters: this.currentEntity[this.entityKeyField],
            },
            postData
          )
          .pipe(
            finalize(() => {
              this.isBusy = false;
            })
          )
          .subscribe((result) => {
            this.dialogService.showMessage("info.submit-succeed");
            if (this.dialogRef) {
              this.dialogRef.events.next({
                eventType: "ENTITY_UPDATED",
              });
            }
            this.currentEntity = result.data;
          });
      }
    });
  }

  protected validateEntity(entity: TE): Promise<boolean> {
    return new Promise((resolve, reject) => {
      validate(entity).then((errors) => {
        if (errors.length > 0) {
          this.showEntityValidationErrors(errors);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
  protected showEntityValidationErrors(errors: ValidationError[]) {
    const errorItems = errors
      .map((err: ValidationError) => {
        return this.getAllFieldValues(err.constraints);
      })
      .join("<br>");
    this.dialogService.error(errorItems, "", {
      enableHtml: true,
    });
  }

  // wait to https://github.com/typestack/class-validator/pull/238
  protected getAllFieldValues(obj) {
    const result = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result.push(obj[key]);
      }
    }
    return result.join("<br>");
  }

  getEntity(entityId: any): Observable<ServerResponse<TE>> {
    return this.queryService.get({
      dataKey: this.config.entityKey,
      urlParameters: entityId,
    });
  }
  getOrNewEntity() {
    const parameterId = this.parameterResolver.get(
      StringConstants.Prameter_EntityId
    );

    if (parameterId) {
      this.isBusy = true;
      this.getEntity(parameterId).subscribe((result) => {
        this.afterEntityLoaded(result.data);
        const tempEntity = Object.assign(this.entityTypeCreator(), result.data);
        this.currentEntity = tempEntity;
        if (this.isReactiveForm) {
          this.form.patchValue(this.currentEntity, {
            emitEvent: false,
          });
        }
        this.isBusy = false;
      });
    } else {
      this.newEntity();
    }
  }

  reset() {
    this.newEntity();
  }

  protected get entityTypeCreator(): () => TE {
    if (this.config.entityTypeCreator) {
      return this.entityTypeService.getTypeCreator(
        this.config.entityTypeCreator
      );
    }
    return () => {
      return {} as TE;
    };
  }
  protected newEntity() {
    let tempNewEntity = this.createNewEntity();
    tempNewEntity = Object.assign(this.entityTypeCreator(), tempNewEntity);
    this.doBeforeNewEntitySet(tempNewEntity);
    this.currentEntity = tempNewEntity;
    if (this.isReactiveForm) {
      this.form.reset(this.currentEntity, {
        emitEvent: false,
      });
    }
  }
  protected currentEntityChanged(oldValue: TE, newValue: TE) {}
  protected createNewEntity(): TE {
    return this.config && this.config.defaultEntity
      ? { ...this.config.defaultEntity }
      : <TE>{};
  }
  protected afterEntityLoaded(entity: TE) {}
  protected doBeforeNewEntitySet(entity: TE) {}
  protected completeEntityBeforeSubmit(entity: TE) {}
  protected extraValidateBeforeSubmit(entity: TE): boolean {
    return true;
  }

  protected deleteEntity() {
    if (this.config.readOnly || this.config.allowDelete === false) {
      return;
    }
    if (this.currentEntity) {
      this.dialogService
        .showConfirm("info.delete-confirm", "info.confirm")
        .closed.then((confirmResult: DialogResult<any>) => {
          if (confirmResult.dialogResult === "yes") {
            this.isBusy = true;
            const data = [{ id: this.currentEntity[this.entityKeyField] }];
            this.queryService
              .delete({ dataKey: this.config.entityKey }, { items: data })
              .pipe(
                finalize(() => {
                  this.isBusy = false;
                })
              )
              .subscribe((x) => {
                if (this.dialogRef) {
                  this.dialogRef.close();
                } else {
                  this.newEntity();
                }
              });
          }
        });
    }
  }

  processCommand(cmd: CommandInfo) {
    if (cmd.commandKey === "save") {
      this.submit();
    }
    if (cmd.commandKey === "delete") {
      this.deleteEntity();
    } else if (cmd.commandKey === "new") {
      this.reset();
    } else {
      super.processCommand(cmd);
    }
  }

  protected createForm(): FormGroup {
    const controls = {};
    if (this.config.fields) {
      for (const field of this.config.fields) {
        controls[field.name] = [undefined];
      }
    }
    return this.formBuilder.group(controls);
  }
}
