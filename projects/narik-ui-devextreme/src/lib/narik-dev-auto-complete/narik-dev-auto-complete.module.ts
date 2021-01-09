import { NarikDevAutoComplete } from './narik-dev-auto-complete.component';
import { NgModule } from '@angular/core';

import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, DxSelectBoxModule],
    declarations: [NarikDevAutoComplete],
    exports: [NarikDevAutoComplete],
    providers: [],
})
export class NarikDevAutoCompleteModule {}
