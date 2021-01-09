import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NarikMatBusyIndicator } from './narik-mat-busy-indicator.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [CommonModule, MatProgressSpinnerModule],
    declarations: [NarikMatBusyIndicator],
    exports: [NarikMatBusyIndicator],
    providers: [],
})
export class NarikMatBusyIndicatorModule {}
