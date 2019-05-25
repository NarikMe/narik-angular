import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikPrimeSelect } from "./narik-prime-select.component";
import { DropdownModule } from "primeng/dropdown";

@NgModule({
  imports: [CommonModule, FormsModule, DropdownModule],
  declarations: [NarikPrimeSelect],
  exports: [NarikPrimeSelect],
  providers: []
})
export class NarikPrimeSelectModule {}
