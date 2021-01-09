import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNebularDataTable } from './narik-nb-data-table.component';

@NgModule({
    imports: [CommonModule, FormsModule, TranslateModule],
    declarations: [NarikNebularDataTable],
    exports: [NarikNebularDataTable],
    providers: [],
})
export class NarikNebularDataTableModule {}
