import { NarikCommonModule } from '@narik/common';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { NarikMatAutoCompleteModule } from '../narik-mat-auto-complete/narik-mat-auto-complete.module';
import { NarikMatCheckBoxListModule } from '../narik-mat-check-box-list/narik-mat-checkbox-list.module';
import { NarikMatCheckBoxModule } from '../narik-mat-check-box/narik-mat-checkbox.module';
import { NarikMatDataTableSelectModule } from '../narik-mat-data-table-select/narik-mat-data-table-select.module';
import { NarikMatDatePickerModule } from '../narik-mat-date-picker/public_api';
import { NarikMatInputModule } from '../narik-mat-input/narik-mat-input.module';
import { NarikMatRadioGroupModule } from '../narik-mat-radio/narik-mat-radio.module';
import { NarikMatSelectModule } from '../narik-mat-select/narik-mat-select.module';
import { NarikMatDynamicForm } from './narik-mat-dynamic-form.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        NarikCommonModule,
        NarikMatInputModule,
        NarikMatSelectModule,
        NarikMatCheckBoxModule,
        NarikMatRadioGroupModule,
        NarikMatAutoCompleteModule,
        NarikMatDatePickerModule,
        NarikMatDataTableSelectModule,
        NarikMatCheckBoxListModule,
        FlexLayoutModule,
    ],
    declarations: [NarikMatDynamicForm],
    exports: [NarikMatDynamicForm],
    providers: [],
})
export class NarikMatDynamicFormModule {}
