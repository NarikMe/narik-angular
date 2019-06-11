import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikNebularTreeview } from "./narik-nb-treeview.component";
import { NarikNebularToolbarModule } from "../narik-nb-toolbar/narik-nb-toolbar.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NarikNebularToolbarModule,
    TranslateModule
  ],
  declarations: [NarikNebularTreeview],
  exports: [NarikNebularTreeview],
  providers: []
})
export class NarikNebularTreeviewModule {}
