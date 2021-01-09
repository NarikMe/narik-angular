import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NarikMatCheckBoxList } from './narik-mat-checkbox-list.component';
import { NarikMatCheckBoxModule } from '../narik-mat-check-box/narik-mat-checkbox.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NarikMatCheckBoxModule,
        MatInputModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
    ],
    declarations: [NarikMatCheckBoxList],
    exports: [NarikMatCheckBoxList],
    providers: [],
})
export class NarikMatCheckBoxListModule {}
