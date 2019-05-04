import { NgModule } from "@angular/core";


import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { NarikNgxBusyIndicator } from "./narik-ngx-busy-indicator.component";

@NgModule({
  imports: [CommonModule,  TranslateModule],
  declarations: [NarikNgxBusyIndicator],
  exports: [NarikNgxBusyIndicator],
  providers: []
})
export class NarikNgxBusyIndicatorModule {}
