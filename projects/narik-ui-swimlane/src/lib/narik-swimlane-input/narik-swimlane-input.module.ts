import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikSwimlaneInput } from './narik-swimlane-input.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NarikSwimlaneInput],
    exports: [NarikSwimlaneInput],
    providers: [],
})
export class NarikSwimlaneInputModule {}
