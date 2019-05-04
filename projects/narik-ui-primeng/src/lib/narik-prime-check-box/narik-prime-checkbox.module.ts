import { NgModule } from "@angular/core";


import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikPrimeCheckBox } from "./narik-prime-checkbox.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NarikPrimeCheckBox],
  exports: [NarikPrimeCheckBox],
  providers: []
})
export class NarikPrimeCheckBoxModule {}
