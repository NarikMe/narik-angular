import { NgModule } from "@angular/core";


import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikPrimeDatePicker } from "./narik-prime-date-picker.component";

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule],
  declarations: [NarikPrimeDatePicker],
  exports: [NarikPrimeDatePicker],
  providers: []
})
export class NarikPrimeDatePickerModule {}
