import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikNgbDataTable } from "./narik-ngb-data-table.component";

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule],
  declarations: [NarikNgbDataTable],
  exports: [NarikNgbDataTable],
  providers: []
})
export class NarikNgbDataTableModule {}
