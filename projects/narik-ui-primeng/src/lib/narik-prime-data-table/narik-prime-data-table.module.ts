import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikPrimeDataTable } from './narik-prime-data-table.component';
import { TableModule } from 'primeng/table';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        TableModule,
        TriStateCheckboxModule,
    ],

    declarations: [NarikPrimeDataTable],
    exports: [NarikPrimeDataTable],
    providers: [],
})
export class NarikPrimeDataTableModule {}
