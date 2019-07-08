import { NarikCommonModule } from "narik-common";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { NarikPrimeButtonModule } from "../narik-prime-button/narik-prime-button.module";
import { NarikPrimeToolBar } from "./narik-prime-toolbar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NarikPrimeButtonModule,
    TranslateModule,
    ToolbarModule,
    TooltipModule,
    NarikCommonModule
  ],
  declarations: [NarikPrimeToolBar],
  exports: [NarikPrimeToolBar],
  providers: []
})
export class NarikPrimeToolbarModule {}
