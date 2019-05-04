import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import {
  DIALOG_CONTAINER,
  DIALOG_INPUT_COMPONENT,
  DIALOG_MESSAGE_COMPONENT
} from "narik-infrastructure";
import { NarikDevButtonModule } from "../narik-dev-button/narik-dev-button.module";
import { NarikDevDynamicFormModule } from "../narik-dev-dynamic-form/narik-dev-dynamic-form.module";
import { NarikDevDialogContainer } from "./narik-dev-dialog-container.component";
import { NarikDevInputDialog } from "./narik-dev-input-dialog.component";
import { NarikDevMessageDialog } from "./narik-dev-message-dialog.component";
import { NarikCommonModule } from "narik-common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NarikCommonModule,
    NarikDevButtonModule,
    NarikDevDynamicFormModule
  ],
  declarations: [
    NarikDevDialogContainer,
    NarikDevInputDialog,
    NarikDevMessageDialog
  ],
  exports: [
    NarikDevDialogContainer,
    NarikDevInputDialog,
    NarikDevMessageDialog
  ],
  providers: [
    {
      provide: DIALOG_CONTAINER,
      useValue: NarikDevDialogContainer
    },
    {
      provide: DIALOG_MESSAGE_COMPONENT,
      useValue: NarikDevMessageDialog
    },
    {
      provide: DIALOG_INPUT_COMPONENT,
      useValue: NarikDevInputDialog
    }
  ],
  entryComponents: [
    NarikDevDialogContainer,
    NarikDevInputDialog,
    NarikDevMessageDialog
  ]
})
export class NarikDevDialogModule {}
