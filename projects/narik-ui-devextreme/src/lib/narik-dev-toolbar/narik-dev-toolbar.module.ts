import { NgModule } from "@angular/core";

import { DxTooltipModule } from "devextreme-angular/ui/tooltip";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikDevToolBar } from "./narik-dev-toolbar.component";
import { NarikDevButtonModule } from "../narik-dev-button/narik-dev-button.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DxTooltipModule,
    NarikDevButtonModule,
    TranslateModule
  ],
  declarations: [NarikDevToolBar],
  exports: [NarikDevToolBar],
  providers: []
})
export class NarikDevToolbarModule {}
