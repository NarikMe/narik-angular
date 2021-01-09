import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNgbInput } from './narik-ngb-input.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NarikNgbInput],
    exports: [NarikNgbInput],
    providers: [],
})
export class NarikNgbInputModule {}
