import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import {
  DIALOG_CONTAINER,
  DIALOG_INPUT_COMPONENT,
  DIALOG_MESSAGE_COMPONENT
} from "@narik/infrastructure";
import { NarikPrimeButtonModule } from "../narik-prime-button/narik-prime-button.module";
import { NarikPrimeDynamicFormModule } from "../narik-prime-dynamic-form/narik-prime-dynamic-form.module";
import { NarikPrimeDialogContainer } from "./narik-prime-dialog-container.component";
import { NarikPrimeInputDialog } from "./narik-prime-input-dialog.component";
import { NarikPrimeMessageDialog } from "./narik-prime-message-dialog.component";
import { NarikCommonModule } from "@narik/common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NarikCommonModule,
    NarikPrimeButtonModule,
    NarikPrimeDynamicFormModule
  ],
  declarations: [
    NarikPrimeDialogContainer,
    NarikPrimeInputDialog,
    NarikPrimeMessageDialog
  ],
  exports: [
    NarikPrimeDialogContainer,
    NarikPrimeInputDialog,
    NarikPrimeMessageDialog
  ],
  providers: [
    {
      provide: DIALOG_CONTAINER,
      useValue: NarikPrimeDialogContainer
    },
    {
      provide: DIALOG_MESSAGE_COMPONENT,
      useValue: NarikPrimeMessageDialog
    },
    {
      provide: DIALOG_INPUT_COMPONENT,
      useValue: NarikPrimeInputDialog
    }
  ],
  entryComponents: [
    NarikPrimeDialogContainer,
    NarikPrimeInputDialog,
    NarikPrimeMessageDialog
  ]
})
export class NarikPrimeDialogModule {}
