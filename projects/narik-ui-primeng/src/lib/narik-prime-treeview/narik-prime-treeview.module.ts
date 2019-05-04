import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikPrimeTreeview } from "./narik-prime-treeview.component";
import { NarikPrimeToolbarModule } from "../narik-prime-toolbar/narik-prime-toolbar.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NarikPrimeToolbarModule,
    TranslateModule
  ],
  declarations: [NarikPrimeTreeview],
  exports: [NarikPrimeTreeview],
  providers: []
})
export class NarikPrimeTreeviewModule {}
