import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikNgbSelect } from "./narik-ngb-select.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NarikNgbSelect],
  exports: [NarikNgbSelect],
  providers: []
})
export class NarikNgbSelectModule {}
