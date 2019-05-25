import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikPrimeToolBar } from "./narik-prime-toolbar.component";
import { NarikPrimeButtonModule } from "../narik-prime-button/narik-prime-button.module";
import { ToolbarModule } from "primeng/toolbar";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NarikPrimeButtonModule,
    TranslateModule,
    ToolbarModule
  ],
  declarations: [NarikPrimeToolBar],
  exports: [NarikPrimeToolBar],
  providers: []
})
export class NarikPrimeToolbarModule {}
