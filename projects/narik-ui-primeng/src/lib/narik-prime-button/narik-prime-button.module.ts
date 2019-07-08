import { NarikCommonModule } from "narik-common";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

import { NarikPrimeButtonComponent } from "./narik-prime-button.component";

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule,
    TranslateModule,
    NarikCommonModule
  ],
  declarations: [NarikPrimeButtonComponent],
  exports: [NarikPrimeButtonComponent],
  providers: []
})
export class NarikPrimeButtonModule {}
