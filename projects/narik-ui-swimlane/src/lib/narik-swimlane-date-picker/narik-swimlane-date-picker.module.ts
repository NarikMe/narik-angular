import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikSwimlaneDatePicker } from './narik-swimlane-date-picker.component';

@NgModule({
    imports: [CommonModule, FormsModule, TranslateModule],
    declarations: [NarikSwimlaneDatePicker],
    exports: [NarikSwimlaneDatePicker],
    providers: [],
})
export class NarikSwimlaneDatePickerModule {}
