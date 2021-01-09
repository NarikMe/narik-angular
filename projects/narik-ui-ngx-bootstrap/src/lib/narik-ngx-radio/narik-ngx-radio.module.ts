import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNgxRadioGroup } from './narik-ngx-radio-group.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NarikNgxRadioGroup],
    exports: [NarikNgxRadioGroup],
    providers: [],
})
export class NarikNgxRadioGroupModule {}
