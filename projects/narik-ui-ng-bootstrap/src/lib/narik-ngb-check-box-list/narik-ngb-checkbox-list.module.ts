import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNgbCheckBoxList } from './narik-ngb-checkbox-list.component';
import { NarikNgbCheckBoxModule } from '../narik-ngb-check-box/narik-ngb-checkbox.module';

@NgModule({
    imports: [CommonModule, FormsModule, NarikNgbCheckBoxModule],
    declarations: [NarikNgbCheckBoxList],
    exports: [NarikNgbCheckBoxList],
    providers: [],
})
export class NarikNgbCheckBoxListModule {}
