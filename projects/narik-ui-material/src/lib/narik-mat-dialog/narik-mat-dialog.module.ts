import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
    DIALOG_CONTAINER,
    DIALOG_INPUT_COMPONENT,
    DIALOG_MESSAGE_COMPONENT,
} from '@narik/infrastructure';
import { NarikMatButtonModule } from '../narik-mat-button/narik-mat-button.module';
import { NarikMatDynamicFormModule } from '../narik-mat-dynamic-form/narik-mat-dynamic-form.module';
import { NarikMatDialogContainer } from './narik-mat-dialog-container.component';
import { NarikMatInputDialog } from './narik-mat-input-dialog.component';
import { NarikMatMessageDialog } from './narik-mat-message-dialog.component';
import { NarikCommonModule } from '@narik/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        NarikCommonModule,
        NarikMatButtonModule,
        NarikMatDynamicFormModule,
        MatDialogModule,
        MatDividerModule,
        MatCardModule,
        DragDropModule,
    ],
    declarations: [
        NarikMatDialogContainer,
        NarikMatInputDialog,
        NarikMatMessageDialog,
    ],
    exports: [
        NarikMatDialogContainer,
        NarikMatInputDialog,
        NarikMatMessageDialog,
    ],
    providers: [
        {
            provide: DIALOG_CONTAINER,
            useValue: NarikMatDialogContainer,
        },
        {
            provide: DIALOG_MESSAGE_COMPONENT,
            useValue: NarikMatMessageDialog,
        },
        {
            provide: DIALOG_INPUT_COMPONENT,
            useValue: NarikMatInputDialog,
        },
    ],
    entryComponents: [
        NarikMatDialogContainer,
        NarikMatInputDialog,
        NarikMatMessageDialog,
    ],
})
export class NarikMatDialogModule {}
