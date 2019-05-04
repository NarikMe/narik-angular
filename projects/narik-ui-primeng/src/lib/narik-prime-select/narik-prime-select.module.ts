import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikPrimeSelect } from "./narik-prime-select.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NarikPrimeSelect],
  exports: [NarikPrimeSelect],
  providers: []
})
export class NarikPrimeSelectModule {}
