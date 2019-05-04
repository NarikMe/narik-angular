import { NgModule } from "@angular/core";

import { DxLoadIndicatorModule } from "devextreme-angular/ui/load-indicator";
import { CommonModule } from "@angular/common";
import { NarikPrimeButtonComponent } from "./narik-prime-button.component";

@NgModule({
  imports: [CommonModule, DxLoadIndicatorModule],
  declarations: [NarikPrimeButtonComponent],
  exports: [NarikPrimeButtonComponent],
  providers: []
})
export class NarikPrimeButtonModule {}
