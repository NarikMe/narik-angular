import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNebularInput } from './narik-nb-input.component';
import { NbInputModule } from '@nebular/theme';

@NgModule({
    imports: [CommonModule, FormsModule, NbInputModule],
    declarations: [NarikNebularInput],
    exports: [NarikNebularInput],
    providers: [],
})
export class NarikNebularInputModule {}
