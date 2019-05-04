import { NgModule } from "@angular/core";

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikMatDatePicker } from "./narik-mat-date-picker.component";
import { TextMaskModule } from "angular2-text-mask";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    TextMaskModule
  ],
  declarations: [NarikMatDatePicker],
  exports: [NarikMatDatePicker],
  providers: []
})
export class NarikMatDatePickerModule {}
