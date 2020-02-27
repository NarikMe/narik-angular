import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import {
  DIALOG_CONTAINER,
  DIALOG_INPUT_COMPONENT,
  DIALOG_MESSAGE_COMPONENT
} from "@narik/infrastructure";
import { NarikNebularButtonModule } from "../narik-nb-button/narik-nb-button.module";
import { NarikNebularDynamicFormModule } from "../narik-nb-dynamic-form/narik-nb-dynamic-form.module";
import { NarikNebularDialogContainer } from "./narik-nb-dialog-container.component";
import { NarikNebularInputDialog } from "./narik-nb-input-dialog.component";
import { NarikNebularMessageDialog } from "./narik-nb-message-dialog.component";
import { NarikCommonModule } from "@narik/common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NarikCommonModule,
    NarikNebularButtonModule,
    NarikNebularDynamicFormModule
  ],
  declarations: [
    NarikNebularDialogContainer,
    NarikNebularInputDialog,
    NarikNebularMessageDialog
  ],
  exports: [
    NarikNebularDialogContainer,
    NarikNebularInputDialog,
    NarikNebularMessageDialog
  ],
  providers: [
    {
      provide: DIALOG_CONTAINER,
      useValue: NarikNebularDialogContainer
    },
    {
      provide: DIALOG_MESSAGE_COMPONENT,
      useValue: NarikNebularMessageDialog
    },
    {
      provide: DIALOG_INPUT_COMPONENT,
      useValue: NarikNebularInputDialog
    }
  ],
  entryComponents: [
    NarikNebularDialogContainer,
    NarikNebularInputDialog,
    NarikNebularMessageDialog
  ]
})
export class NarikNebularDialogModule {}
