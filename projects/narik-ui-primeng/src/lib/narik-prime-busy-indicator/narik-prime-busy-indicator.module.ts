import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NarikPrimeBusyIndicator } from './narik-prime-busy-indicator.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    imports: [CommonModule, TranslateModule, ProgressSpinnerModule],
    declarations: [NarikPrimeBusyIndicator],
    exports: [NarikPrimeBusyIndicator],
    providers: [],
})
export class NarikPrimeBusyIndicatorModule {}
