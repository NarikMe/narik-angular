import { NgModule } from '@angular/core';

import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikDevSelect } from './narik-dev-select.component';

@NgModule({
    imports: [CommonModule, FormsModule, DxSelectBoxModule],
    declarations: [NarikDevSelect],
    exports: [NarikDevSelect],
    providers: [],
})
export class NarikDevSelectModule {}
