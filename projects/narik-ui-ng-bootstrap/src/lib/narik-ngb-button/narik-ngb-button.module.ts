import { NarikCommonModule } from "narik-common";

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";

import { NarikNgbButtonComponent } from "./narik-ngb-button.component";

@NgModule({
  imports: [CommonModule, NgbTooltipModule, TranslateModule, NarikCommonModule],
  declarations: [NarikNgbButtonComponent],
  exports: [NarikNgbButtonComponent],
  providers: []
})
export class NarikNgbButtonModule {}
