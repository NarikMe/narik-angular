import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNgbRadioGroup } from './narik-ngb-radio-group.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NarikNgbRadioGroup],
    exports: [NarikNgbRadioGroup],
    providers: [],
})
export class NarikNgbRadioGroupModule {}
