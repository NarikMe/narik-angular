import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
    DIALOG_CONTAINER,
    DIALOG_INPUT_COMPONENT,
    DIALOG_MESSAGE_COMPONENT,
} from '@narik/infrastructure';
import { NarikNgxButtonModule } from '../narik-ngx-button/narik-ngx-button.module';
import { NarikNgxDynamicFormModule } from '../narik-ngx-dynamic-form/narik-ngx-dynamic-form.module';
import { NarikNgxDialogContainer } from './narik-ngx-dialog-container.component';
import { NarikNgxInputDialog } from './narik-ngx-input-dialog.component';
import { NarikNgxMessageDialog } from './narik-ngx-message-dialog.component';
import { NarikCommonModule } from '@narik/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        NarikCommonModule,
        NarikNgxButtonModule,
        NarikNgxDynamicFormModule,
    ],
    declarations: [
        NarikNgxDialogContainer,
        NarikNgxInputDialog,
        NarikNgxMessageDialog,
    ],
    exports: [
        NarikNgxDialogContainer,
        NarikNgxInputDialog,
        NarikNgxMessageDialog,
    ],
    providers: [
        {
            provide: DIALOG_CONTAINER,
            useValue: NarikNgxDialogContainer,
        },
        {
            provide: DIALOG_MESSAGE_COMPONENT,
            useValue: NarikNgxMessageDialog,
        },
        {
            provide: DIALOG_INPUT_COMPONENT,
            useValue: NarikNgxInputDialog,
        },
    ],
    entryComponents: [
        NarikNgxDialogContainer,
        NarikNgxInputDialog,
        NarikNgxMessageDialog,
    ],
})
export class NarikNgxDialogModule {}
