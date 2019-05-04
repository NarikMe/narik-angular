import { NarikPrimeAutoComplete } from "./narik-prime-auto-complete.component";
import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NarikPrimeAutoComplete],
  exports: [NarikPrimeAutoComplete],
  providers: []
})
export class NarikPrimeAutoCompleteModule {}
