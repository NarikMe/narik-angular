import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { NarikNebularBusyIndicator } from "./narik-nb-busy-indicator.component";
import { NbSpinnerModule } from "@nebular/theme";

@NgModule({
  imports: [CommonModule, TranslateModule, NbSpinnerModule],
  declarations: [NarikNebularBusyIndicator],
  exports: [NarikNebularBusyIndicator],
  providers: []
})
export class NarikNebularBusyIndicatorModule {}
