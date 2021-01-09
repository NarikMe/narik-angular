import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNebularCheckBoxList } from './narik-nb-checkbox-list.component';
import { NarikNebularCheckBoxModule } from '../narik-nb-check-box/narik-nb-checkbox.module';

@NgModule({
    imports: [CommonModule, FormsModule, NarikNebularCheckBoxModule],
    declarations: [NarikNebularCheckBoxList],
    exports: [NarikNebularCheckBoxList],
    providers: [],
})
export class NarikNebularCheckBoxListModule {}
