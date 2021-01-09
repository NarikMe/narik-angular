import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikPrimeCheckBox } from './narik-prime-checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    imports: [CommonModule, FormsModule, CheckboxModule],
    declarations: [NarikPrimeCheckBox],
    exports: [NarikPrimeCheckBox],
    providers: [],
})
export class NarikPrimeCheckBoxModule {}
