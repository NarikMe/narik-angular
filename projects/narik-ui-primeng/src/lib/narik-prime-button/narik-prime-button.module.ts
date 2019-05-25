import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { NarikPrimeButtonComponent } from "./narik-prime-button.component";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";

@NgModule({
  imports: [CommonModule, ButtonModule, TooltipModule],
  declarations: [NarikPrimeButtonComponent],
  exports: [NarikPrimeButtonComponent],
  providers: []
})
export class NarikPrimeButtonModule {}
