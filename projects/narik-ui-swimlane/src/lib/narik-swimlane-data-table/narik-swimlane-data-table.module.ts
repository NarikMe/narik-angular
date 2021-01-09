import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NarikSwimlaneInputModule } from '../narik-swimlane-input/narik-swimlane-input.module';
import { NarikSwimlaneDataTable } from './narik-swimlane-data-table.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        NgxDatatableModule,
        NarikSwimlaneInputModule,
    ],
    declarations: [NarikSwimlaneDataTable],
    exports: [NarikSwimlaneDataTable],
    providers: [],
})
export class NarikSwimlaneDataTableModule {}
