import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { NarikNgbAutoCompleteModule } from "./narik-ngb-auto-complete/narik-ngb-auto-complete.module";
import { NarikNgbBusyIndicatorModule } from "./narik-ngb-busy-indicator/narik-ngb-busy-indicator.module";
import { NarikNgbButtonModule } from "./narik-ngb-button/narik-ngb-button.module";
import { NarikNgbCheckBoxModule } from "./narik-ngb-check-box/narik-ngb-checkbox.module";
import { NarikNgbCheckBoxListModule } from "./narik-ngb-check-box-list/narik-ngb-checkbox-list.module";
import { NarikNgbDataTableModule } from "./narik-ngb-data-table/narik-ngb-data-table.module";
import { NarikNgbDatePickerModule } from "./narik-ngb-date-picker/narik-ngb-date-picker.module";
import { NarikNgbDialogModule } from "./narik-ngb-dialog/narik-ngb-dialog.module";
import { NarikNgbDynamicFormModule } from "./narik-ngb-dynamic-form/narik-ngb-dynamic-form.module";
import { NarikNgbSelectModule } from "./narik-ngb-select/narik-ngb-select.module";
import { NarikNgbInputModule } from "./narik-ngb-input/narik-ngb-input.module";
import { NarikNgbRadioGroupModule } from "./narik-ngb-radio/narik-ngb-radio.module";
import { NarikNgbTreeviewModule } from "./narik-ngb-treeview/narik-ngb-treeview.module";
import { NarikNgbToolbarModule } from "./narik-ngb-toolbar/narik-ngb-toolbar.module";
import { NarikNgbCoreModule } from "./narik-ngb-core/narik-ngb-core.module";

@NgModule({
  imports: [
    TranslateModule,
    NarikNgbAutoCompleteModule,
    NarikNgbBusyIndicatorModule,
    NarikNgbButtonModule,
    NarikNgbCheckBoxModule,
    NarikNgbCheckBoxListModule,
    NarikNgbDataTableModule,
    NarikNgbDatePickerModule,
    NarikNgbDialogModule,
    NarikNgbDynamicFormModule,
    NarikNgbInputModule,
    NarikNgbRadioGroupModule,
    NarikNgbSelectModule,
    NarikNgbToolbarModule,
    NarikNgbTreeviewModule,
    NarikNgbCoreModule
  ],
  declarations: [],
  exports: [
    TranslateModule,
    NarikNgbAutoCompleteModule,
    NarikNgbBusyIndicatorModule,
    NarikNgbButtonModule,
    NarikNgbCheckBoxModule,
    NarikNgbCheckBoxListModule,
    NarikNgbDataTableModule,
    NarikNgbDatePickerModule,
    NarikNgbDialogModule,
    NarikNgbDynamicFormModule,
    NarikNgbInputModule,
    NarikNgbRadioGroupModule,
    NarikNgbSelectModule,
    NarikNgbToolbarModule,
    NarikNgbTreeviewModule,
    NarikNgbCoreModule
  ],
  providers: []
})
export class NarikUiNgBootstrapModule {}
