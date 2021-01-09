import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNebularCheckBox } from './narik-nb-checkbox.component';
import { NbCheckboxModule } from '@nebular/theme';

@NgModule({
    imports: [CommonModule, FormsModule, NbCheckboxModule],
    declarations: [NarikNebularCheckBox],
    exports: [NarikNebularCheckBox],
    providers: [],
})
export class NarikNebularCheckBoxModule {}
