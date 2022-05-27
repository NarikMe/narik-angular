import { Component, OnInit, Inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import {
    DialogInputContent,
    EntityField,
    PARAMETERS,
} from '@narik/infrastructure';

@Component({
    templateUrl: 'narik-mat-input-dialog.component.html',
})
export class NarikMatInputDialog implements OnInit, DialogInputContent {
    entity: any = {};
    fields: any[] = [];
    form: FormGroup;
    constructor(
        @Inject(PARAMETERS) parameters: any,
        private formBuilder: FormBuilder
    ) {
        if (parameters) {
            this.entity = parameters.entity;
            this.fields = parameters.fields;

            this.form = this.buildForm();

            this.form.patchValue(this.entity);
        }
    }

    ngOnInit() {}

    protected buildForm(): FormGroup {
        const controls = {};
        if (this.fields) {
            for (const field of this.fields) {
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

        return validators;
    }
}
