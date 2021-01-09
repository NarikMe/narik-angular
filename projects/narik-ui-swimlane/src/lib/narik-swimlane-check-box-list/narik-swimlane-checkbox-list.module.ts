import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikSwimlaneCheckBoxList } from './narik-swimlane-checkbox-list.component';
import { NarikSwimlaneCheckBoxModule } from '../narik-swimlane-check-box/narik-swimlane-checkbox.module';

@NgModule({
    imports: [CommonModule, FormsModule, NarikSwimlaneCheckBoxModule],
    declarations: [NarikSwimlaneCheckBoxList],
    exports: [NarikSwimlaneCheckBoxList],
    providers: [],
})
export class NarikSwimlaneCheckBoxListModule {}
