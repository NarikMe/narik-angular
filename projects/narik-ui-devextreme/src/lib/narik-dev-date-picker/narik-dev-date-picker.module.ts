import { NgModule } from "@angular/core";

import { DxDateBoxModule } from "devextreme-angular/ui/date-box";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikDevDatePicker } from "./narik-dev-date-picker.component";

@NgModule({
  imports: [CommonModule, FormsModule, DxDateBoxModule, TranslateModule],
  declarations: [NarikDevDatePicker],
  exports: [NarikDevDatePicker],
  providers: []
})
export class NarikDevDatePickerModule {}
