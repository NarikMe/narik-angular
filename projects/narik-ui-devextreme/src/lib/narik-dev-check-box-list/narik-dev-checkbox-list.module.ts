import { NgModule } from "@angular/core";

import { DxCheckBoxModule } from "devextreme-angular/ui/check-box";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikDevCheckBoxList } from "./narik-dev-checkbox-list.component";
import { NarikDevCheckBoxModule } from "../narik-dev-check-box/narik-dev-checkbox.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DxCheckBoxModule,
    NarikDevCheckBoxModule
  ],
  declarations: [NarikDevCheckBoxList],
  exports: [NarikDevCheckBoxList],
  providers: []
})
export class NarikDevCheckBoxListModule {}
