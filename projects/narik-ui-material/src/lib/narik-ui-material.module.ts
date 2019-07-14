import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { NarikMatAutoCompleteModule } from "./narik-mat-auto-complete/narik-mat-auto-complete.module";
import { NarikMatBusyIndicatorModule } from "./narik-mat-busy-indicator/narik-mat-busy-indicator.module";
import { NarikMatButtonModule } from "./narik-mat-button/narik-mat-button.module";
import { NarikMatCheckBoxModule } from "./narik-mat-check-box/narik-mat-checkbox.module";
import { NarikMatCheckBoxListModule } from "./narik-mat-check-box-list/narik-mat-checkbox-list.module";
import { NarikMatDataTableModule } from "./narik-mat-data-table/narik-mat-data-table.module";
import { NarikMatDatePickerModule } from "./narik-mat-date-picker/narik-mat-date-picker.module";
import { NarikMatDialogModule } from "./narik-mat-dialog/narik-mat-dialog.module";
import { NarikMatDynamicFormModule } from "./narik-mat-dynamic-form/narik-mat-dynamic-form.module";
import { NarikMatSelectModule } from "./narik-mat-select/narik-mat-select.module";
import { NarikMatInputModule } from "./narik-mat-input/narik-mat-input.module";
import { NarikMatRadioGroupModule } from "./narik-mat-radio/narik-mat-radio.module";
import { NarikMatTreeviewModule } from "./narik-mat-treeview/narik-mat-treeview.module";
import { NarikMatToolbarModule } from "./narik-mat-toolbar/narik-mat-toolbar.module";
import { NarikMatCoreModule } from "./narik-mat-core/narik-mat-core.module";
import { NarikMatDataTableSelectModule } from "./narik-mat-data-table-select/narik-mat-data-table-select.module";
import { NarikMatTabOutletModule } from "./narik-mat-tab-outlet/narik-mat-tab-outlet.module";

@NgModule({
  imports: [
    TranslateModule,
    NarikMatAutoCompleteModule,
    NarikMatBusyIndicatorModule,
    NarikMatButtonModule,
    NarikMatCheckBoxModule,
    NarikMatCheckBoxListModule,
    NarikMatDataTableModule,
    NarikMatDatePickerModule,
    NarikMatDialogModule,
    NarikMatDynamicFormModule,
    NarikMatInputModule,
    NarikMatRadioGroupModule,
    NarikMatSelectModule,
    NarikMatToolbarModule,
    NarikMatTreeviewModule,
    NarikMatCoreModule,
    NarikMatDataTableSelectModule,
    NarikMatTabOutletModule
  ],
  declarations: [],
  exports: [
    TranslateModule,
    NarikMatAutoCompleteModule,
    NarikMatBusyIndicatorModule,
    NarikMatButtonModule,
    NarikMatCheckBoxModule,
    NarikMatCheckBoxListModule,
    NarikMatDataTableModule,
    NarikMatDatePickerModule,
    NarikMatDialogModule,
    NarikMatDynamicFormModule,
    NarikMatInputModule,
    NarikMatRadioGroupModule,
    NarikMatSelectModule,
    NarikMatToolbarModule,
    NarikMatTreeviewModule,
    NarikMatCoreModule,
    NarikMatDataTableSelectModule,
    NarikMatTabOutletModule
  ],
  providers: [],
  entryComponents: []
})
export class NarikUiMaterialModule {}
