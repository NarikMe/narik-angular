import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikSwimlaneCheckBox } from './narik-swimlane-checkbox.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NarikSwimlaneCheckBox],
    exports: [NarikSwimlaneCheckBox],
    providers: [],
})
export class NarikSwimlaneCheckBoxModule {}
