import { NgModule } from "@angular/core";

import { DxTreeListModule } from "devextreme-angular/ui/tree-list";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikDevTreeview } from "./narik-dev-treeview.component";
import { NarikDevToolbarModule } from "../narik-dev-toolbar/narik-dev-toolbar.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DxTreeListModule,
    NarikDevToolbarModule,
    TranslateModule
  ],
  declarations: [NarikDevTreeview],
  exports: [NarikDevTreeview],
  providers: []
})
export class NarikDevTreeviewModule {}
