import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { NarikCommonModule } from "narik-common";
import { NarikNebularTabOutlet } from "./narik-nb-tab-outlet.component";
import { NbTabsetModule } from "@nebular/theme";
@NgModule({
  imports: [CommonModule, TranslateModule, NarikCommonModule, NbTabsetModule],
  declarations: [NarikNebularTabOutlet],
  exports: [NarikNebularTabOutlet],
  providers: []
})
export class NarikNebularTabOutletModule {}
