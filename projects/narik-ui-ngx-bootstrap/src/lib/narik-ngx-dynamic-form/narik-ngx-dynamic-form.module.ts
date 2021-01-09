import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { NarikNgxAutoCompleteModule } from '../narik-ngx-auto-complete/narik-ngx-auto-complete.module';
import { NarikNgxCheckBoxModule } from '../narik-ngx-check-box/narik-ngx-checkbox.module';
import { NarikNgxDatePickerModule } from '../narik-ngx-date-picker/public_api';
import { NarikNgxInputModule } from '../narik-ngx-input/narik-ngx-input.module';
import { NarikNgxRadioGroupModule } from '../narik-ngx-radio/narik-ngx-radio.module';
import { NarikNgxSelectModule } from '../narik-ngx-select/narik-ngx-select.module';
import { NarikNgxDynamicForm } from './narik-ngx-dynamic-form.component';
import { NarikCommonModule } from '@narik/common';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        NarikNgxInputModule,
        NarikNgxSelectModule,
        NarikNgxCheckBoxModule,
        NarikNgxRadioGroupModule,
        NarikNgxAutoCompleteModule,
        NarikNgxDatePickerModule,
        NarikCommonModule,
    ],
    declarations: [NarikNgxDynamicForm],
    exports: [NarikNgxDynamicForm],
    providers: [],
})
export class NarikNgxDynamicFormModule {}
