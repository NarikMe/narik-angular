import { NgModule } from '@angular/core';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikMatCheckBox } from './narik-mat-checkbox.component';

@NgModule({
    imports: [CommonModule, FormsModule, MatCheckboxModule],
    declarations: [NarikMatCheckBox],
    exports: [NarikMatCheckBox],
    providers: [],
})
export class NarikMatCheckBoxModule {}
