import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikNgxTreeview } from "./narik-ngx-treeview.component";
import { NarikNgxToolbarModule } from "../narik-ngx-toolbar/narik-ngx-toolbar.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NarikNgxToolbarModule,
    TranslateModule
  ],
  declarations: [NarikNgxTreeview],
  exports: [NarikNgxTreeview],
  providers: []
})
export class NarikNgxTreeviewModule {}
