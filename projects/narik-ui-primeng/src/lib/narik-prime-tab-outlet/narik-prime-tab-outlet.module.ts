import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { NarikCommonModule } from "@narik/common";
import { NarikPrimeTabOutlet } from "./narik-prime-tab-outlet.component";
import { TabViewModule } from "primeng/tabview";
@NgModule({
  imports: [CommonModule, TranslateModule, NarikCommonModule, TabViewModule],
  declarations: [NarikPrimeTabOutlet],
  exports: [NarikPrimeTabOutlet],
  providers: []
})
export class NarikPrimeTabOutletModule {}
