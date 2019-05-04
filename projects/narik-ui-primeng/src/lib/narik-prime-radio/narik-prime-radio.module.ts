import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikPrimeRadioGroup } from "./narik-prime-radio-group.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NarikPrimeRadioGroup],
  exports: [NarikPrimeRadioGroup],
  providers: []
})
export class NarikPrimeRadioGroupModule {}
