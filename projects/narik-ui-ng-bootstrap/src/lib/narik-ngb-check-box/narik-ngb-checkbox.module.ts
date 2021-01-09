import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNgbCheckBox } from './narik-ngb-checkbox.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NarikNgbCheckBox],
    exports: [NarikNgbCheckBox],
    providers: [],
})
export class NarikNgbCheckBoxModule {}
