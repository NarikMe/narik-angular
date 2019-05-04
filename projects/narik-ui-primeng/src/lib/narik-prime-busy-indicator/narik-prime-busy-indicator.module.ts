import { NgModule } from "@angular/core";


import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { NarikPrimeBusyIndicator } from "./narik-prime-busy-indicator.component";

@NgModule({
  imports: [CommonModule,  TranslateModule],
  declarations: [NarikPrimeBusyIndicator],
  exports: [NarikPrimeBusyIndicator],
  providers: []
})
export class NarikPrimeBusyIndicatorModule {}
