import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import {
  DIALOG_CONTAINER,
  DIALOG_INPUT_COMPONENT,
  DIALOG_MESSAGE_COMPONENT
} from "@narik/infrastructure";
import { NarikNgbButtonModule } from "../narik-ngb-button/narik-ngb-button.module";
import { NarikNgbDynamicFormModule } from "../narik-ngb-dynamic-form/narik-ngb-dynamic-form.module";
import { NarikNgbDialogContainer } from "./narik-ngb-dialog-container.component";
import { NarikNgbInputDialog } from "./narik-ngb-input-dialog.component";
import { NarikNgbMessageDialog } from "./narik-ngb-message-dialog.component";
import { NarikCommonModule } from "@narik/common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NarikCommonModule,
    NarikNgbButtonModule,
    NarikNgbDynamicFormModule
  ],
  declarations: [
    NarikNgbDialogContainer,
    NarikNgbInputDialog,
    NarikNgbMessageDialog
  ],
  exports: [
    NarikNgbDialogContainer,
    NarikNgbInputDialog,
    NarikNgbMessageDialog
  ],
  providers: [
    {
      provide: DIALOG_CONTAINER,
      useValue: NarikNgbDialogContainer
    },
    {
      provide: DIALOG_MESSAGE_COMPONENT,
      useValue: NarikNgbMessageDialog
    },
    {
      provide: DIALOG_INPUT_COMPONENT,
      useValue: NarikNgbInputDialog
    }
  ],
  entryComponents: [
    NarikNgbDialogContainer,
    NarikNgbInputDialog,
    NarikNgbMessageDialog
  ]
})
export class NarikNgbDialogModule {}
