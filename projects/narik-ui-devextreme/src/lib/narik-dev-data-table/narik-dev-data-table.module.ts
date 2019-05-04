import { NgModule } from "@angular/core";

import { DxDataGridModule } from "devextreme-angular/ui/data-grid";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikDevDataTable } from "./narik-dev-data-table.component";

@NgModule({
  imports: [CommonModule, FormsModule, DxDataGridModule, TranslateModule],
  declarations: [NarikDevDataTable],
  exports: [NarikDevDataTable],
  providers: []
})
export class NarikDevDataTableModule {}
