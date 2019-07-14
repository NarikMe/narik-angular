import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { NarikDevAutoCompleteModule } from "./narik-dev-auto-complete/narik-dev-auto-complete.module";
import { NarikDevBusyIndicatorModule } from "./narik-dev-busy-indicator/narik-dev-busy-indicator.module";
import { NarikDevButtonModule } from "./narik-dev-button/narik-dev-button.module";
import { NarikDevCheckBoxModule } from "./narik-dev-check-box/narik-dev-checkbox.module";
import { NarikDevCheckBoxListModule } from "./narik-dev-check-box-list/narik-dev-checkbox-list.module";
import { NarikDevDataTableModule } from "./narik-dev-data-table/narik-dev-data-table.module";
import { NarikDevDatePickerModule } from "./narik-dev-date-picker/narik-dev-date-picker.module";
import { NarikDevDialogModule } from "./narik-dev-dialog/narik-dev-dialog.module";
import { NarikDevDynamicFormModule } from "./narik-dev-dynamic-form/narik-dev-dynamic-form.module";
import { NarikDevSelectModule } from "./narik-dev-select/narik-dev-select.module";
import { NarikDevInputModule } from "./narik-dev-input/narik-dev-input.module";
import { NarikDevRadioGroupModule } from "./narik-dev-radio/narik-dev-radio.module";
import { NarikDevTreeviewModule } from "./narik-dev-treeview/narik-dev-treeview.module";
import { NarikDevToolbarModule } from "./narik-dev-toolbar/narik-dev-toolbar.module";
import { NarikDevCoreModule } from "./narik-dev-core/narik-dev-core.module";
import { NarikDevTabOutletModule } from "./narik-dev-tab-outlet/narik-dev-tab-outlet.module";

@NgModule({
  imports: [
    TranslateModule,
    NarikDevAutoCompleteModule,
    NarikDevBusyIndicatorModule,
    NarikDevButtonModule,
    NarikDevCheckBoxModule,
    NarikDevCheckBoxListModule,
    NarikDevDataTableModule,
    NarikDevDatePickerModule,
    NarikDevDialogModule,
    NarikDevDynamicFormModule,
    NarikDevInputModule,
    NarikDevRadioGroupModule,
    NarikDevSelectModule,
    NarikDevToolbarModule,
    NarikDevTreeviewModule,
    NarikDevCoreModule,
    NarikDevTabOutletModule
  ],
  declarations: [],
  exports: [
    TranslateModule,
    NarikDevAutoCompleteModule,
    NarikDevBusyIndicatorModule,
    NarikDevButtonModule,
    NarikDevCheckBoxModule,
    NarikDevCheckBoxListModule,
    NarikDevDataTableModule,
    NarikDevDatePickerModule,
    NarikDevDialogModule,
    NarikDevDynamicFormModule,
    NarikDevInputModule,
    NarikDevRadioGroupModule,
    NarikDevSelectModule,
    NarikDevToolbarModule,
    NarikDevTreeviewModule,
    NarikDevCoreModule,
    NarikDevTabOutletModule
  ],

  providers: [],
  entryComponents: []
})
export class NarikUiDevextremeModule {}
