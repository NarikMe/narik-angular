import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikMatInput } from './narik-mat-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatTooltipModule,
    ],
    declarations: [NarikMatInput],
    exports: [NarikMatInput],
    providers: [],
})
export class NarikMatInputModule {}
