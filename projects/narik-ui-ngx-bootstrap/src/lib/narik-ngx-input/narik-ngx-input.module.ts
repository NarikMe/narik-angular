import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNgxInput } from './narik-ngx-input.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NarikNgxInput],
    exports: [NarikNgxInput],
    providers: [],
})
export class NarikNgxInputModule {}
