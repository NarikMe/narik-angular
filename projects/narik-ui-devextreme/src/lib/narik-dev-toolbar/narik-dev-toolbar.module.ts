import { DxTooltipModule } from "devextreme-angular/ui/tooltip";
import { NarikCommonModule } from "narik-common";

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { NarikDevButtonModule } from "../narik-dev-button/narik-dev-button.module";
import { NarikDevToolBar } from "./narik-dev-toolbar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DxTooltipModule,
    NarikDevButtonModule,
    TranslateModule,
    NarikCommonModule
  ],
  declarations: [NarikDevToolBar],
  exports: [NarikDevToolBar],
  providers: []
})
export class NarikDevToolbarModule {}
