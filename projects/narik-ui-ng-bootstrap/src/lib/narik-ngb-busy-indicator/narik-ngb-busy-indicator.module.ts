import { NgModule } from "@angular/core";


import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { NarikNgbBusyIndicator } from "./narik-ngb-busy-indicator.component";

@NgModule({
  imports: [CommonModule,  TranslateModule],
  declarations: [NarikNgbBusyIndicator],
  exports: [NarikNgbBusyIndicator],
  providers: []
})
export class NarikNgbBusyIndicatorModule {}
