import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikMatSelect } from './narik-mat-select.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NarikMatToolbarModule } from '../narik-mat-toolbar/narik-mat-toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        MatIconModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatToolbarModule,
        MatTooltipModule,
        TranslateModule,
        NarikMatToolbarModule,
    ],
    declarations: [NarikMatSelect],
    exports: [NarikMatSelect],
    providers: [],
})
export class NarikMatSelectModule {}
