import { NarikPrimeCheckBoxListModule } from "./../narik-prime-check-box-list/narik-prime-checkbox-list.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { NarikPrimeAutoCompleteModule } from "../narik-prime-auto-complete/narik-prime-auto-complete.module";
import { NarikPrimeCheckBoxModule } from "../narik-prime-check-box/narik-prime-checkbox.module";
import { NarikPrimeDatePickerModule } from "../narik-prime-date-picker/public_api";
import { NarikPrimeInputModule } from "../narik-prime-input/narik-prime-input.module";
import { NarikPrimeRadioGroupModule } from "../narik-prime-radio/narik-prime-radio.module";
import { NarikPrimeSelectModule } from "../narik-prime-select/narik-prime-select.module";
import { NarikPrimeDynamicForm } from "./narik-prime-dynamic-form.component";
import { NarikCommonModule } from "narik-common";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NarikPrimeInputModule,
    NarikPrimeSelectModule,
    NarikPrimeCheckBoxModule,
    NarikPrimeRadioGroupModule,
    NarikPrimeAutoCompleteModule,
    NarikPrimeDatePickerModule,
    NarikPrimeCheckBoxListModule,
    NarikCommonModule,
    FlexLayoutModule
  ],
  declarations: [NarikPrimeDynamicForm],
  exports: [NarikPrimeDynamicForm],
  providers: []
})
export class NarikPrimeDynamicFormModule {}
