import { NarikNebularAutoComplete } from './narik-nb-auto-complete.component';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NarikNebularAutoComplete],
    exports: [NarikNebularAutoComplete],
    providers: [],
})
export class NarikNebularAutoCompleteModule {}
