import { NarikNgxAutoComplete } from './narik-ngx-auto-complete.component';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NarikNgxAutoComplete],
    exports: [NarikNgxAutoComplete],
    providers: [],
})
export class NarikNgxAutoCompleteModule {}
