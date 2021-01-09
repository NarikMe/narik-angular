import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNgxCheckBoxList } from './narik-ngx-checkbox-list.component';
import { NarikNgxCheckBoxModule } from '../narik-ngx-check-box/narik-ngx-checkbox.module';

@NgModule({
    imports: [CommonModule, FormsModule, NarikNgxCheckBoxModule],
    declarations: [NarikNgxCheckBoxList],
    exports: [NarikNgxCheckBoxList],
    providers: [],
})
export class NarikNgxCheckBoxListModule {}
