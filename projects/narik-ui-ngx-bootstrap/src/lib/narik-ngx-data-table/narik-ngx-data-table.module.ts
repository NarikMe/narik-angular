import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikNgxDataTable } from './narik-ngx-data-table.component';

@NgModule({
    imports: [CommonModule, FormsModule, TranslateModule],
    declarations: [NarikNgxDataTable],
    exports: [NarikNgxDataTable],
    providers: [],
})
export class NarikNgxDataTableModule {}
