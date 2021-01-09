import { NarikCommonModule } from '@narik/common';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import { NarikMatButtonComponent } from './narik-mat-button.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        TranslateModule,
        NarikCommonModule,
    ],
    declarations: [NarikMatButtonComponent],
    exports: [NarikMatButtonComponent],
    providers: [],
})
export class NarikMatButtonModule {}
