import { NarikPrimeAutoComplete } from "./narik-prime-auto-complete.component";
import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";

@NgModule({
  imports: [CommonModule, FormsModule, AutoCompleteModule],
  declarations: [NarikPrimeAutoComplete],
  exports: [NarikPrimeAutoComplete],
  providers: []
})
export class NarikPrimeAutoCompleteModule {}
