import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNgxDatePicker } from './narik-ngx-date-picker.component';

@NgModule({
    imports: [CommonModule, FormsModule, TranslateModule],
    declarations: [NarikNgxDatePicker],
    exports: [NarikNgxDatePicker],
    providers: [],
})
export class NarikNgxDatePickerModule {}
