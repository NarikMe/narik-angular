import { NgModule } from '@angular/core';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikMatDataTable } from './narik-mat-data-table.component';
import { MatInputModule } from '@angular/material/input';
import {
    MatPaginatorModule,
    MatPaginatorIntl,
} from '@angular/material/paginator';
import { PaginatorI18n } from './paginatorI18n';
import { NarikMatBusyIndicatorModule } from '../narik-mat-busy-indicator/narik-mat-busy-indicator.module';
import { MatIconModule } from '@angular/material/icon';
import { NarikMatInputModule } from '../narik-mat-input/narik-mat-input.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NarikMatButtonModule } from '../narik-mat-button/narik-mat-button.module';
import { MatTooltipModule } from '@angular/material/tooltip';

export function PaginatorI18nFactory(translateService: TranslateService) {
    return new PaginatorI18n(translateService).getPaginatorIntl();
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatSortModule,
        TranslateModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        NarikMatBusyIndicatorModule,
        NarikMatInputModule,
        MatIconModule,
        MatCheckboxModule,
        MatMenuModule,
        MatButtonModule,
        NarikMatButtonModule,
        MatTooltipModule,
    ],
    declarations: [NarikMatDataTable],
    exports: [NarikMatDataTable],
    providers: [
        {
            provide: MatPaginatorIntl,
            deps: [TranslateService],
            useFactory: PaginatorI18nFactory,
        },
    ],
})
export class NarikMatDataTableModule {}
