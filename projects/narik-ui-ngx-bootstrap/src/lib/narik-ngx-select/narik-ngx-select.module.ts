import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikNgxSelect } from "./narik-ngx-select.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NarikNgxSelect],
  exports: [NarikNgxSelect],
  providers: []
})
export class NarikNgxSelectModule {}
