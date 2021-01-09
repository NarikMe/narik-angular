import { NarikMatAutoComplete } from './narik-mat-auto-complete.component';
import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
    ],
    declarations: [NarikMatAutoComplete],
    exports: [NarikMatAutoComplete],
    providers: [],
})
export class NarikMatAutoCompleteModule {}
