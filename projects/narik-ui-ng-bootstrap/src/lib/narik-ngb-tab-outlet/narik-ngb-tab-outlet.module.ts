import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { NarikCommonModule } from "narik-common";
import { NarikNgbTabOutlet } from "./narik-ngb-tab-outlet.component";
import { NgbTabsetModule } from "@ng-bootstrap/ng-bootstrap";
@NgModule({
  imports: [CommonModule, TranslateModule, NarikCommonModule, NgbTabsetModule],
  declarations: [NarikNgbTabOutlet],
  exports: [NarikNgbTabOutlet],
  providers: []
})
export class NarikNgbTabOutletModule {}
