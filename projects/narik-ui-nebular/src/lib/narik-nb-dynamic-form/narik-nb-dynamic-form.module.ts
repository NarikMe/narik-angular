import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { NarikNebularAutoCompleteModule } from "../narik-nb-auto-complete/narik-nb-auto-complete.module";
import { NarikNebularCheckBoxModule } from "../narik-nb-check-box/narik-nb-checkbox.module";
import { NarikNebularDatePickerModule } from "../narik-nb-date-picker/public_api";
import { NarikNebularInputModule } from "../narik-nb-input/narik-nb-input.module";
import { NarikNebularRadioGroupModule } from "../narik-nb-radio/narik-nb-radio.module";
import { NarikNebularSelectModule } from "../narik-nb-select/narik-nb-select.module";
import { NarikNebularCheckBoxListModule } from "./../narik-nb-check-box-list/narik-nb-checkbox-list.module";
import { NarikNebularDynamicForm } from "./narik-nb-dynamic-form.component";
import { NarikCommonModule } from "narik-common";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NarikNebularInputModule,
    NarikNebularSelectModule,
    NarikNebularCheckBoxModule,
    NarikNebularRadioGroupModule,
    NarikNebularAutoCompleteModule,
    NarikNebularDatePickerModule,
    NarikNebularCheckBoxListModule,
    NarikCommonModule,
    FlexLayoutModule
  ],
  declarations: [NarikNebularDynamicForm],
  exports: [NarikNebularDynamicForm],
  providers: []
})
export class NarikNebularDynamicFormModule {}
