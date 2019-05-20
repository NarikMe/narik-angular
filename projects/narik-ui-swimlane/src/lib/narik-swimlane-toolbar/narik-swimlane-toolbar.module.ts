import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikSwimlaneToolBar } from "./narik-swimlane-toolbar.component";
import { NarikSwimlaneButtonModule } from "../narik-swimlane-button/narik-swimlane-button.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NarikSwimlaneButtonModule,
    TranslateModule
  ],
  declarations: [NarikSwimlaneToolBar],
  exports: [NarikSwimlaneToolBar],
  providers: []
})
export class NarikSwimlaneToolbarModule {}
