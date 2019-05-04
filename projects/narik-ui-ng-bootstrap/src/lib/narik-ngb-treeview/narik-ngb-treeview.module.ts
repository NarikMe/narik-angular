import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikNgbTreeview } from "./narik-ngb-treeview.component";
import { NarikNgbToolbarModule } from "../narik-ngb-toolbar/narik-ngb-toolbar.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NarikNgbToolbarModule,
    TranslateModule
  ],
  declarations: [NarikNgbTreeview],
  exports: [NarikNgbTreeview],
  providers: []
})
export class NarikNgbTreeviewModule {}
