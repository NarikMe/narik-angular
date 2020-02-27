import { NarikCommonModule } from "@narik/common";

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";

import { NarikNgbButtonModule } from "../narik-ngb-button/narik-ngb-button.module";
import { NarikNgbToolBar } from "./narik-ngb-toolbar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NarikNgbButtonModule,
    TranslateModule,
    NgbTooltipModule,
    NarikCommonModule
  ],
  declarations: [NarikNgbToolBar],
  exports: [NarikNgbToolBar],
  providers: []
})
export class NarikNgbToolbarModule {}
