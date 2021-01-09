import { NarikCommonModule } from '@narik/common';
import {
    DIALOG_OVERLAY_CONTAINER,
    NarikInfrastructureModule,
} from '@narik/infrastructure';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NarikDialogOverlayContainerComponent } from './components/narik-dialog-overlay-container/narik-dialog-overlay-container.component';
import { COMPONENTS, ENTRY_COMPONENTS, EXPORT_COMPONENTS } from './index';
import {
    DynamicFormService,
    NarikDynamicFormService,
} from './services/dynamic-form.service';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NarikCommonModule,
        NarikInfrastructureModule,
    ],
    declarations: [COMPONENTS],
    exports: [EXPORT_COMPONENTS, FormsModule, CommonModule],
    entryComponents: [ENTRY_COMPONENTS],
    providers: [
        {
            provide: DynamicFormService,
            useClass: NarikDynamicFormService,
        },
        {
            provide: DIALOG_OVERLAY_CONTAINER,
            useValue: NarikDialogOverlayContainerComponent,
        },
    ],
})
export class NarikUiCoreModule {}
