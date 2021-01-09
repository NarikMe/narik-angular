import { NgModule } from '@angular/core';

import {
    NgbDatepickerModule,
    NgbDateAdapter,
    NgbDateNativeAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNgbDatePicker } from './narik-ngb-date-picker.component';

@NgModule({
    imports: [CommonModule, FormsModule, NgbDatepickerModule, TranslateModule],
    declarations: [NarikNgbDatePicker],
    exports: [NarikNgbDatePicker],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class NarikNgbDatePickerModule {}
