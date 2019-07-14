import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { NarikPrimeAutoCompleteModule } from "./narik-prime-auto-complete/narik-prime-auto-complete.module";
import { NarikPrimeBusyIndicatorModule } from "./narik-prime-busy-indicator/narik-prime-busy-indicator.module";
import { NarikPrimeButtonModule } from "./narik-prime-button/narik-prime-button.module";
import { NarikPrimeCheckBoxModule } from "./narik-prime-check-box/narik-prime-checkbox.module";
import { NarikPrimeCheckBoxListModule } from "./narik-prime-check-box-list/narik-prime-checkbox-list.module";
import { NarikPrimeDataTableModule } from "./narik-prime-data-table/narik-prime-data-table.module";
import { NarikPrimeDatePickerModule } from "./narik-prime-date-picker/narik-prime-date-picker.module";
import { NarikPrimeDialogModule } from "./narik-prime-dialog/narik-prime-dialog.module";
import { NarikPrimeDynamicFormModule } from "./narik-prime-dynamic-form/narik-prime-dynamic-form.module";
import { NarikPrimeSelectModule } from "./narik-prime-select/narik-prime-select.module";
import { NarikPrimeInputModule } from "./narik-prime-input/narik-prime-input.module";
import { NarikPrimeRadioGroupModule } from "./narik-prime-radio/narik-prime-radio.module";
import { NarikPrimeTreeviewModule } from "./narik-prime-treeview/narik-prime-treeview.module";
import { NarikPrimeToolbarModule } from "./narik-prime-toolbar/narik-prime-toolbar.module";
import { NarikPrimeCoreModule } from "./narik-prime-core/narik-prime-core.module";
import { NarikPrimeTabOutletModule } from "./narik-prime-tab-outlet/narik-prime-tab-outlet.module";

@NgModule({
  imports: [
    TranslateModule,
    NarikPrimeAutoCompleteModule,
    NarikPrimeBusyIndicatorModule,
    NarikPrimeButtonModule,
    NarikPrimeCheckBoxModule,
    NarikPrimeCheckBoxListModule,
    NarikPrimeDataTableModule,
    NarikPrimeDatePickerModule,
    NarikPrimeDialogModule,
    NarikPrimeDynamicFormModule,
    NarikPrimeInputModule,
    NarikPrimeRadioGroupModule,
    NarikPrimeSelectModule,
    NarikPrimeToolbarModule,
    NarikPrimeTreeviewModule,
    NarikPrimeCoreModule,
    NarikPrimeTabOutletModule
  ],
  declarations: [],
  exports: [
    TranslateModule,
    NarikPrimeAutoCompleteModule,
    NarikPrimeBusyIndicatorModule,
    NarikPrimeButtonModule,
    NarikPrimeCheckBoxModule,
    NarikPrimeCheckBoxListModule,
    NarikPrimeDataTableModule,
    NarikPrimeDatePickerModule,
    NarikPrimeDialogModule,
    NarikPrimeDynamicFormModule,
    NarikPrimeInputModule,
    NarikPrimeRadioGroupModule,
    NarikPrimeSelectModule,
    NarikPrimeToolbarModule,
    NarikPrimeTreeviewModule,
    NarikPrimeCoreModule,
    NarikPrimeTabOutletModule
  ],
  providers: []
})
export class NarikUiPrimeModule {}
