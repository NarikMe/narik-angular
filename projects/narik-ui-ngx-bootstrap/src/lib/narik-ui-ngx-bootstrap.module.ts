import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { NarikNgxAutoCompleteModule } from "./narik-ngx-auto-complete/narik-ngx-auto-complete.module";
import { NarikNgxBusyIndicatorModule } from "./narik-ngx-busy-indicator/narik-ngx-busy-indicator.module";
import { NarikNgxButtonModule } from "./narik-ngx-button/narik-ngx-button.module";
import { NarikNgxCheckBoxModule } from "./narik-ngx-check-box/narik-ngx-checkbox.module";
import { NarikNgxCheckBoxListModule } from "./narik-ngx-check-box-list/narik-ngx-checkbox-list.module";
import { NarikNgxDataTableModule } from "./narik-ngx-data-table/narik-ngx-data-table.module";
import { NarikNgxDatePickerModule } from "./narik-ngx-date-picker/narik-ngx-date-picker.module";
import { NarikNgxDialogModule } from "./narik-ngx-dialog/narik-ngx-dialog.module";
import { NarikNgxDynamicFormModule } from "./narik-ngx-dynamic-form/narik-ngx-dynamic-form.module";
import { NarikNgxSelectModule } from "./narik-ngx-select/narik-ngx-select.module";
import { NarikNgxInputModule } from "./narik-ngx-input/narik-ngx-input.module";
import { NarikNgxRadioGroupModule } from "./narik-ngx-radio/narik-ngx-radio.module";
import { NarikNgxTreeviewModule } from "./narik-ngx-treeview/narik-ngx-treeview.module";
import { NarikNgxToolbarModule } from "./narik-ngx-toolbar/narik-ngx-toolbar.module";
import { NarikNgxCoreModule } from "./narik-ngx-core/narik-ngx-core.module";

@NgModule({
  imports: [
    TranslateModule,
    NarikNgxAutoCompleteModule,
    NarikNgxBusyIndicatorModule,
    NarikNgxButtonModule,
    NarikNgxCheckBoxModule,
    NarikNgxCheckBoxListModule,
    NarikNgxDataTableModule,
    NarikNgxDatePickerModule,
    NarikNgxDialogModule,
    NarikNgxDynamicFormModule,
    NarikNgxInputModule,
    NarikNgxRadioGroupModule,
    NarikNgxSelectModule,
    NarikNgxToolbarModule,
    NarikNgxTreeviewModule,
    NarikNgxCoreModule
  ],
  declarations: [],
  exports: [
    TranslateModule,
    NarikNgxAutoCompleteModule,
    NarikNgxBusyIndicatorModule,
    NarikNgxButtonModule,
    NarikNgxCheckBoxModule,
    NarikNgxCheckBoxListModule,
    NarikNgxDataTableModule,
    NarikNgxDatePickerModule,
    NarikNgxDialogModule,
    NarikNgxDynamicFormModule,
    NarikNgxInputModule,
    NarikNgxRadioGroupModule,
    NarikNgxSelectModule,
    NarikNgxToolbarModule,
    NarikNgxTreeviewModule,
    NarikNgxCoreModule
  ],
  providers: []
})
export class NarikUiNgxBootstrapModule {}
