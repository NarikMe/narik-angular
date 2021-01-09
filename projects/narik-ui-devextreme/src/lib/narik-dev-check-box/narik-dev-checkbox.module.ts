import { NgModule } from '@angular/core';

import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikDevCheckBox } from './narik-dev-checkbox.component';

@NgModule({
    imports: [CommonModule, FormsModule, DxCheckBoxModule],
    declarations: [NarikDevCheckBox],
    exports: [NarikDevCheckBox],
    providers: [],
})
export class NarikDevCheckBoxModule {}
