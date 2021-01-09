import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikPrimeCheckBoxList } from './narik-prime-checkbox-list.component';
import { NarikPrimeCheckBoxModule } from '../narik-prime-check-box/narik-prime-checkbox.module';

@NgModule({
    imports: [CommonModule, FormsModule, NarikPrimeCheckBoxModule],
    declarations: [NarikPrimeCheckBoxList],
    exports: [NarikPrimeCheckBoxList],
    providers: [],
})
export class NarikPrimeCheckBoxListModule {}
