import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikPrimeInput } from './narik-prime-input.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [CommonModule, FormsModule, InputTextModule],
    declarations: [NarikPrimeInput],
    exports: [NarikPrimeInput],
    providers: [],
})
export class NarikPrimeInputModule {}
