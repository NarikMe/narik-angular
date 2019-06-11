import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { NarikNebularAutoCompleteModule } from "./narik-nb-auto-complete/narik-nb-auto-complete.module";
import { NarikNebularBusyIndicatorModule } from "./narik-nb-busy-indicator/narik-nb-busy-indicator.module";
import { NarikNebularButtonModule } from "./narik-nb-button/narik-nb-button.module";
import { NarikNebularCheckBoxModule } from "./narik-nb-check-box/narik-nb-checkbox.module";
import { NarikNebularCheckBoxListModule } from "./narik-nb-check-box-list/narik-nb-checkbox-list.module";
import { NarikNebularDataTableModule } from "./narik-nb-data-table/narik-nb-data-table.module";
import { NarikNebularDatePickerModule } from "./narik-nb-date-picker/narik-nb-date-picker.module";
import { NarikNebularDialogModule } from "./narik-nb-dialog/narik-nb-dialog.module";
import { NarikNebularDynamicFormModule } from "./narik-nb-dynamic-form/narik-nb-dynamic-form.module";
import { NarikNebularSelectModule } from "./narik-nb-select/narik-nb-select.module";
import { NarikNebularInputModule } from "./narik-nb-input/narik-nb-input.module";
import { NarikNebularRadioGroupModule } from "./narik-nb-radio/narik-nb-radio.module";
import { NarikNebularTreeviewModule } from "./narik-nb-treeview/narik-nb-treeview.module";
import { NarikNebularToolbarModule } from "./narik-nb-toolbar/narik-nb-toolbar.module";
import { NarikNebularCoreModule } from "./narik-nb-core/narik-nb-core.module";

@NgModule({
  imports: [
    TranslateModule,
    NarikNebularAutoCompleteModule,
    NarikNebularBusyIndicatorModule,
    NarikNebularButtonModule,
    NarikNebularCheckBoxModule,
    NarikNebularCheckBoxListModule,
    NarikNebularDataTableModule,
    NarikNebularDatePickerModule,
    NarikNebularDialogModule,
    NarikNebularDynamicFormModule,
    NarikNebularInputModule,
    NarikNebularRadioGroupModule,
    NarikNebularSelectModule,
    NarikNebularToolbarModule,
    NarikNebularTreeviewModule,
    NarikNebularCoreModule
  ],
  declarations: [],
  exports: [
    TranslateModule,
    NarikNebularAutoCompleteModule,
    NarikNebularBusyIndicatorModule,
    NarikNebularButtonModule,
    NarikNebularCheckBoxModule,
    NarikNebularCheckBoxListModule,
    NarikNebularDataTableModule,
    NarikNebularDatePickerModule,
    NarikNebularDialogModule,
    NarikNebularDynamicFormModule,
    NarikNebularInputModule,
    NarikNebularRadioGroupModule,
    NarikNebularSelectModule,
    NarikNebularToolbarModule,
    NarikNebularTreeviewModule,
    NarikNebularCoreModule
  ],
  providers: []
})
export class NarikUiNebularModule {}
