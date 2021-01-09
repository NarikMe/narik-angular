import { NarikPrimeBusyIndicatorModule } from './../narik-prime-busy-indicator/narik-prime-busy-indicator.module';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NarikPrimeRadioGroup } from './narik-prime-radio-group.component';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RadioButtonModule,
        NarikPrimeBusyIndicatorModule,
    ],
    declarations: [NarikPrimeRadioGroup],
    exports: [NarikPrimeRadioGroup],
    providers: [],
})
export class NarikPrimeRadioGroupModule {}
