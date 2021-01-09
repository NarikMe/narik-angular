import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { NarikSwimlaneAutoCompleteModule } from '../narik-swimlane-auto-complete/narik-swimlane-auto-complete.module';
import { NarikSwimlaneCheckBoxModule } from '../narik-swimlane-check-box/narik-swimlane-checkbox.module';
import { NarikSwimlaneDatePickerModule } from '../narik-swimlane-date-picker/public_api';
import { NarikSwimlaneInputModule } from '../narik-swimlane-input/narik-swimlane-input.module';
import { NarikSwimlaneRadioGroupModule } from '../narik-swimlane-radio/narik-swimlane-radio.module';
import { NarikSwimlaneSelectModule } from '../narik-swimlane-select/narik-swimlane-select.module';
import { NarikSwimlaneCheckBoxListModule } from './../narik-swimlane-check-box-list/narik-swimlane-checkbox-list.module';
import { NarikSwimlaneDynamicForm } from './narik-swimlane-dynamic-form.component';
import { NarikCommonModule } from '@narik/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        NarikSwimlaneInputModule,
        NarikSwimlaneSelectModule,
        NarikSwimlaneCheckBoxModule,
        NarikSwimlaneRadioGroupModule,
        NarikSwimlaneAutoCompleteModule,
        NarikSwimlaneDatePickerModule,
        NarikSwimlaneCheckBoxListModule,
        NarikCommonModule,
        FlexLayoutModule,
    ],
    declarations: [NarikSwimlaneDynamicForm],
    exports: [NarikSwimlaneDynamicForm],
    providers: [],
})
export class NarikSwimlaneDynamicFormModule {}
