import { NarikCommonModule } from '@narik/common';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

import { NarikNebularButtonComponent } from './narik-nb-button.component';

@NgModule({
    imports: [
        CommonModule,
        NbButtonModule,
        NbIconModule,
        NbTooltipModule,
        TranslateModule,
        NarikCommonModule,
    ],
    declarations: [NarikNebularButtonComponent],
    exports: [NarikNebularButtonComponent],
    providers: [],
})
export class NarikNebularButtonModule {}
