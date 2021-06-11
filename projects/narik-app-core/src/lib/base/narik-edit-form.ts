import { Directive, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    ValidatorFn,
} from '@angular/forms';
import {
    formatString,
    isEquivalent,
    isFunction,
    NarikValidators,
} from '@narik/common';
import { NarikInject } from '@narik/core';
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
    EntityField,
    ValidationService,
} from '@narik/infrastructure';
import { DynamicFormService } from '@narik/ui-core';
import { TranslateService } from '@ngx-translate/core';
import { validate, ValidationError } from 'class-validator';
import { denormalize } from 'data-adapter';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, filter, finalize } from 'rxjs/operators';
import { EDIT_DEFAULT_VIEW_OPTION } from '../injectionTokens';
import { EditFormConfig } from '../interfaces/form-config.model';
import {
    DefaultEditViewOption,
    EditFormViewOption,
} from '../interfaces/form-view-option.model';
import { ServerResponse } from '../interfaces/server-response.model';
import { StringConstants } from '../util/constants';
import { NarikGeneralForm } from './narik-general-form';

/**
 * Narik edit form
 */
@Directive()
export abstract class NarikEditForm<TE extends NarikEntity>
    extends NarikGeneralForm<TE>
    implements OnInit {
    protected entityKeyField: string;

    formsOptions: any;
    generalValidators: any;

    private currentEntityChangedSubject: Subject<{
        oldEntity: TE;
        newEntity: TE;
    }> = new Subject();

    currentEntityChanged$ = this.currentEntityChangedSubject.asObservable();

    private formBuiltSubject: BehaviorSubject<FormGroup> = new BehaviorSubject(
        undefined
    );

    formBuilt$ = this.formBuiltSubject
        .asObservable()
        .pipe(filter((form) => !!form));

    @NarikInject(EDIT_DEFAULT_VIEW_OPTION, DefaultEditViewOption)
    defaultOption: EditFormViewOption;

    @NarikInject(DialogService)
    dialogService: DialogService;

    @NarikInject(ConfigService)
    configService: ConfigService;

    @NarikInject(ValidationService)
    validationService: ValidationService;

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

    form: FormGroup;

    @ViewChild('formElement', { read: ElementRef, static: false })
    formElement: ElementRef;

    _currentEntity: TE = <any>{};
    _config: EditFormConfig;

    fields: NarikViewField[];

    @NarikInject(DynamicFormService)
    dynamicFormService: DynamicFormService;

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
            this.currentEntityChangedSubject.next({
                oldEntity: oldValue,
                newEntity: value,
            });
            this.detectChanges();
        }
    }
    get currentEntity(): TE {
        return this._currentEntity;
    }

    constructor(injector: Injector) {
        super(injector);
        this.entityKeyField =
            this.configService.getConfig('entityKeyField') || 'viewModelId';

        this.formsOptions = this.metaDataService.getValue<any>(
            this.moduleKey,
            'formsOptions'
        );

        this.generalValidators = this.validationService.validators();
    }

    ngOnInit() {
        this.config =
            this.config ||
            this.parameterResolver.get(StringConstants.Prameter_Config);
        if (this.config?.isDynamic) {
            this.fields = this.dynamicFormService
                .createFieldsFromEntityFields(this.config.fields)
                .filter((x) => x.showInEdit)
                .sort(function (obj1, obj2) {
                    return (
                        (obj1.orderInEdit || obj1.order) -
                        (obj2.orderInEdit || obj2.order)
                    );
                });
        }

        this.form = this.buildForm();
        this.formBuiltSubject.next(this.form);
        if (this.config?.isDynamic) {
            this.form.valueChanges.pipe(debounceTime(100)).subscribe(() => {
                this.detectChanges();
            });
        }
        this.getOrNewEntity();
        this.detectChanges();
    }

    showFormElementErrors(form: FormGroup, formElement: ElementRef) {
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
        let errMessage = '';
        for (const item of errors) {
            const label =
                formElement && item.key
                    ? this.findLabel(formElement, item.key)
                    : item.key
                    ? this.translateService.instant(item.key)
                    : '';
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
                    this.translateService.instant('errors.' + item.errKey),
                    label,
                    ...errorDataArray
                ) + '<br>';
        }
        this.dialogService.error(errMessage, '', {
            enableHtml: true,
        });
    }
    findLabel(formElement: ElementRef, key: string) {
        const element = formElement.nativeElement.querySelector(
            '[narik-form-item-key=' + key + ']'
        );
        if (element) {
            const labelAttr = element.attributes['narik-form-item-label'];
            if (labelAttr) {
                return this.translateService.instant(labelAttr.value);
            }
        }
        return this.translateService.instant(key);
    }

    protected getPostData() {
        const denormalizeEntity = this.denormalizeEntity(this.currentEntity);
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

        this.applyFormOnEntity(this.currentEntity, this.form);

        this.completeEntityBeforeSubmit(this.currentEntity);

        if (this.form && !this.form.valid) {
            this.form.markAllAsTouched();
            this.showFormErrors(this.form, this.formElement);
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
                                ? 'PUT'
                                : 'POST',
                            urlParameters: this.currentEntity[
                                this.entityKeyField
                            ],
                        },
                        postData
                    )
                    .pipe(
                        finalize(() => {
                            this.isBusy = false;
                        })
                    )
                    .subscribe((result) => {
                        this.dialogService.showMessage('info.submit-succeed');
                        if (this.dialogRef) {
                            this.dialogRef.events.next({
                                eventType: 'ENTITY_UPDATED',
                            });
                        }
                        this.currentEntity = result.data;
                    });
            }
        });
    }
    protected applyFormOnEntity(currentEntity: TE, form: FormGroup) {
        this.currentEntity = Object.assign(currentEntity, form.value);
    }
    protected showFormErrors(form: FormGroup, formElement: ElementRef<any>) {
        if (formElement) {
            this.showFormElementErrors(form, formElement);
        }
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
            .join('<br>');
        this.dialogService.error(errorItems, '', {
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
        return result.join('<br>');
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
                const tempEntity = Object.assign(
                    this.entityTypeCreator(),
                    result.data
                );
                this.currentEntity = tempEntity;

                const denormalizeEntity = this.denormalizeEntity(
                    this.currentEntity
                );
                this.form.patchValue(denormalizeEntity, {
                    emitEvent: false,
                });

                this.isBusy = false;
            });
        } else {
            this.newEntity();
        }
    }

    reset() {
        this.newEntity();
    }

    protected denormalizeEntity(entity: TE): TE {
        return isFunction((this.currentEntity as any).toJson)
            ? (this.currentEntity as any).toJson()
            : denormalize(this.currentEntity);
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
        const denormalizeEntity = this.denormalizeEntity(this.currentEntity);
        this.form.reset(denormalizeEntity, {
            emitEvent: false,
        });
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
                .showConfirm('info.delete-confirm', 'info.confirm')
                .closed.then((confirmResult: DialogResult<any>) => {
                    if (confirmResult.dialogResult === 'yes') {
                        this.isBusy = true;
                        const data = [
                            { id: this.currentEntity[this.entityKeyField] },
                        ];
                        this.queryService
                            .delete(
                                { dataKey: this.config.entityKey },
                                { items: data }
                            )
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
        if (cmd.commandKey === 'save') {
            this.submit();
        }
        if (cmd.commandKey === 'delete') {
            this.deleteEntity();
        } else if (cmd.commandKey === 'new') {
            this.reset();
        } else {
            super.processCommand(cmd);
        }
    }

    protected buildForm(): FormGroup {
        const controls = {};
        if (this.config.fields) {
            for (const field of this.config.fields) {
                controls[field.name] = [
                    undefined,
                    Validators.compose(this.createValidators(field)),
                ];
            }
        }
        return this.formBuilder.group(controls);
    }
    createValidators(field: EntityField): (ValidatorFn | null | undefined)[] {
        const validators = [];

        if (field.required) {
            validators.push(Validators.required);
        }
        if (field.validators) {
            validators.push(
                NarikValidators.GeneralValidator(
                    this.generalValidators,
                    field.validators,
                    field.validatorParams
                )
            );
        }
        return validators;
    }
}
