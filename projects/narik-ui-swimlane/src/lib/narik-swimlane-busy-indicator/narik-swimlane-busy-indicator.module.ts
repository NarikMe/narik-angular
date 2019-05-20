import { NgModule } from "@angular/core";


import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { NarikSwimlaneBusyIndicator } from "./narik-swimlane-busy-indicator.component";

@NgModule({
  imports: [CommonModule,  TranslateModule],
  declarations: [NarikSwimlaneBusyIndicator],
  exports: [NarikSwimlaneBusyIndicator],
  providers: []
})
export class NarikSwimlaneBusyIndicatorModule {}
