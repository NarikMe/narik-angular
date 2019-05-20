import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikSwimlaneTreeview } from "./narik-swimlane-treeview.component";
import { NarikSwimlaneToolbarModule } from "../narik-swimlane-toolbar/narik-swimlane-toolbar.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NarikSwimlaneToolbarModule,
    TranslateModule
  ],
  declarations: [NarikSwimlaneTreeview],
  exports: [NarikSwimlaneTreeview],
  providers: []
})
export class NarikSwimlaneTreeviewModule {}
