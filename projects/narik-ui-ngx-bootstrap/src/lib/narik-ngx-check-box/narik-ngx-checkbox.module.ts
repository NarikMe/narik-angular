import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNgxCheckBox } from './narik-ngx-checkbox.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NarikNgxCheckBox],
    exports: [NarikNgxCheckBox],
    providers: [],
})
export class NarikNgxCheckBoxModule {}
