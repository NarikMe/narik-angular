import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikPrimeInput } from "./narik-prime-input.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NarikPrimeInput],
  exports: [NarikPrimeInput],
  providers: []
})
export class NarikPrimeInputModule {}
