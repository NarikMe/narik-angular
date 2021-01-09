import { NarikCommonModule } from '@narik/common';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import { NarikMatButtonModule } from '../narik-mat-button/narik-mat-button.module';
import { NarikMatToolBar } from './narik-mat-toolbar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatToolbarModule,
        NarikMatButtonModule,
        MatTooltipModule,
        TranslateModule,
        MatDividerModule,
        NarikCommonModule,
    ],
    declarations: [NarikMatToolBar],
    exports: [NarikMatToolBar],
    providers: [],
})
export class NarikMatToolbarModule {}
