import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { NarikDevAutoCompleteModule } from "../narik-dev-auto-complete/narik-dev-auto-complete.module";
import { NarikDevCheckBoxModule } from "../narik-dev-check-box/narik-dev-checkbox.module";
import { NarikDevDatePickerModule } from "../narik-dev-date-picker/public_api";
import { NarikDevInputModule } from "../narik-dev-input/narik-dev-input.module";
import { NarikDevRadioGroupModule } from "../narik-dev-radio/narik-dev-radio.module";
import { NarikDevSelectModule } from "../narik-dev-select/narik-dev-select.module";
import { NarikDevDynamicForm } from "./narik-dev-dynamic-form.component";
import { NarikCommonModule } from "narik-common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NarikDevInputModule,
    NarikDevSelectModule,
    NarikDevCheckBoxModule,
    NarikDevRadioGroupModule,
    NarikDevAutoCompleteModule,
    NarikDevDatePickerModule,
    NarikCommonModule
  ],
  declarations: [NarikDevDynamicForm],
  exports: [NarikDevDynamicForm],
  providers: []
})
export class NarikDevDynamicFormModule {}
