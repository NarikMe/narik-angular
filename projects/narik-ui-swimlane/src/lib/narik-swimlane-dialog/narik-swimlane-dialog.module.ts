import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
    DIALOG_CONTAINER,
    DIALOG_INPUT_COMPONENT,
    DIALOG_MESSAGE_COMPONENT,
} from '@narik/infrastructure';
import { NarikSwimlaneButtonModule } from '../narik-swimlane-button/narik-swimlane-button.module';
import { NarikSwimlaneDynamicFormModule } from '../narik-swimlane-dynamic-form/narik-swimlane-dynamic-form.module';
import { NarikSwimlaneDialogContainer } from './narik-swimlane-dialog-container.component';
import { NarikSwimlaneInputDialog } from './narik-swimlane-input-dialog.component';
import { NarikSwimlaneMessageDialog } from './narik-swimlane-message-dialog.component';
import { NarikCommonModule } from '@narik/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        NarikCommonModule,
        NarikSwimlaneButtonModule,
        NarikSwimlaneDynamicFormModule,
    ],
    declarations: [
        NarikSwimlaneDialogContainer,
        NarikSwimlaneInputDialog,
        NarikSwimlaneMessageDialog,
    ],
    exports: [
        NarikSwimlaneDialogContainer,
        NarikSwimlaneInputDialog,
        NarikSwimlaneMessageDialog,
    ],
    providers: [
        {
            provide: DIALOG_CONTAINER,
            useValue: NarikSwimlaneDialogContainer,
        },
        {
            provide: DIALOG_MESSAGE_COMPONENT,
            useValue: NarikSwimlaneMessageDialog,
        },
        {
            provide: DIALOG_INPUT_COMPONENT,
            useValue: NarikSwimlaneInputDialog,
        },
    ],
    entryComponents: [
        NarikSwimlaneDialogContainer,
        NarikSwimlaneInputDialog,
        NarikSwimlaneMessageDialog,
    ],
})
export class NarikSwimlaneDialogModule {}
