import { NarikCommonModule } from '@narik/common';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NbActionsModule,
    NbCardModule,
    NbIconModule,
    NbTooltipModule,
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

import { NarikNebularToolBar } from './narik-nb-toolbar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NbActionsModule,
        NbCardModule,
        NbTooltipModule,
        NbIconModule,
        TranslateModule,
        NarikCommonModule,
    ],
    declarations: [NarikNebularToolBar],
    exports: [NarikNebularToolBar],
    providers: [],
})
export class NarikNebularToolbarModule {}
