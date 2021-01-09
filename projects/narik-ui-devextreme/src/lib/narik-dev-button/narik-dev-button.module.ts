import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { NarikCommonModule } from '@narik/common';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { NarikDevButtonComponent } from './narik-dev-button.component';

@NgModule({
    imports: [
        CommonModule,
        DxButtonModule,
        DxLoadIndicatorModule,
        DxTooltipModule,
        TranslateModule,
        NarikCommonModule,
    ],
    declarations: [NarikDevButtonComponent],
    exports: [NarikDevButtonComponent],
    providers: [],
})
export class NarikDevButtonModule {}
