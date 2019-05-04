import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { NarikNgbAutoCompleteModule } from "../narik-ngb-auto-complete/narik-ngb-auto-complete.module";
import { NarikNgbCheckBoxModule } from "../narik-ngb-check-box/narik-ngb-checkbox.module";
import { NarikNgbDatePickerModule } from "../narik-ngb-date-picker/public_api";
import { NarikNgbInputModule } from "../narik-ngb-input/narik-ngb-input.module";
import { NarikNgbRadioGroupModule } from "../narik-ngb-radio/narik-ngb-radio.module";
import { NarikNgbSelectModule } from "../narik-ngb-select/narik-ngb-select.module";
import { NarikNgbDynamicForm } from "./narik-ngb-dynamic-form.component";
import { NarikCommonModule } from "narik-common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NarikNgbInputModule,
    NarikNgbSelectModule,
    NarikNgbCheckBoxModule,
    NarikNgbRadioGroupModule,
    NarikNgbAutoCompleteModule,
    NarikNgbDatePickerModule,
    NarikCommonModule
  ],
  declarations: [NarikNgbDynamicForm],
  exports: [NarikNgbDynamicForm],
  providers: []
})
export class NarikNgbDynamicFormModule {}
