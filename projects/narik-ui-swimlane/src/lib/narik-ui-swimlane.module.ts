import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { NarikSwimlaneAutoCompleteModule } from "./narik-swimlane-auto-complete/narik-swimlane-auto-complete.module";
import { NarikSwimlaneBusyIndicatorModule } from "./narik-swimlane-busy-indicator/narik-swimlane-busy-indicator.module";
import { NarikSwimlaneButtonModule } from "./narik-swimlane-button/narik-swimlane-button.module";
import { NarikSwimlaneCheckBoxModule } from "./narik-swimlane-check-box/narik-swimlane-checkbox.module";
import { NarikSwimlaneCheckBoxListModule } from "./narik-swimlane-check-box-list/narik-swimlane-checkbox-list.module";
import { NarikSwimlaneDataTableModule } from "./narik-swimlane-data-table/narik-swimlane-data-table.module";
import { NarikSwimlaneDatePickerModule } from "./narik-swimlane-date-picker/narik-swimlane-date-picker.module";
import { NarikSwimlaneDialogModule } from "./narik-swimlane-dialog/narik-swimlane-dialog.module";
import { NarikSwimlaneDynamicFormModule } from "./narik-swimlane-dynamic-form/narik-swimlane-dynamic-form.module";
import { NarikSwimlaneSelectModule } from "./narik-swimlane-select/narik-swimlane-select.module";
import { NarikSwimlaneInputModule } from "./narik-swimlane-input/narik-swimlane-input.module";
import { NarikSwimlaneRadioGroupModule } from "./narik-swimlane-radio/narik-swimlane-radio.module";
import { NarikSwimlaneTreeviewModule } from "./narik-swimlane-treeview/narik-swimlane-treeview.module";
import { NarikSwimlaneToolbarModule } from "./narik-swimlane-toolbar/narik-swimlane-toolbar.module";
import { NarikSwimlaneCoreModule } from "./narik-swimlane-core/narik-swimlane-core.module";

@NgModule({
  imports: [
    TranslateModule,
    NarikSwimlaneAutoCompleteModule,
    NarikSwimlaneBusyIndicatorModule,
    NarikSwimlaneButtonModule,
    NarikSwimlaneCheckBoxModule,
    NarikSwimlaneCheckBoxListModule,
    NarikSwimlaneDataTableModule,
    NarikSwimlaneDatePickerModule,
    NarikSwimlaneDialogModule,
    NarikSwimlaneDynamicFormModule,
    NarikSwimlaneInputModule,
    NarikSwimlaneRadioGroupModule,
    NarikSwimlaneSelectModule,
    NarikSwimlaneToolbarModule,
    NarikSwimlaneTreeviewModule,
    NarikSwimlaneCoreModule
  ],
  declarations: [],
  exports: [
    TranslateModule,
    NarikSwimlaneAutoCompleteModule,
    NarikSwimlaneBusyIndicatorModule,
    NarikSwimlaneButtonModule,
    NarikSwimlaneCheckBoxModule,
    NarikSwimlaneCheckBoxListModule,
    NarikSwimlaneDataTableModule,
    NarikSwimlaneDatePickerModule,
    NarikSwimlaneDialogModule,
    NarikSwimlaneDynamicFormModule,
    NarikSwimlaneInputModule,
    NarikSwimlaneRadioGroupModule,
    NarikSwimlaneSelectModule,
    NarikSwimlaneToolbarModule,
    NarikSwimlaneTreeviewModule,
    NarikSwimlaneCoreModule
  ],
  providers: []
})
export class NarikUiSwimlaneModule {}
