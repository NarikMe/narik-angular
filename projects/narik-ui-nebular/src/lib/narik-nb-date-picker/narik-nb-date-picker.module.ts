import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNebularDatePicker } from './narik-nb-date-picker.component';
import { NbDatepickerModule, NbInputModule } from '@nebular/theme';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        NbDatepickerModule.forRoot(),
        NbInputModule,
    ],
    declarations: [NarikNebularDatePicker],
    exports: [NarikNebularDatePicker],
})
export class NarikNebularDatePickerModule {}
