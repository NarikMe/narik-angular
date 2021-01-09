import { NgModule } from '@angular/core';

import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NarikDevBusyIndicator } from './narik-dev-busy-indicator.component';

@NgModule({
    imports: [CommonModule, DxLoadIndicatorModule, TranslateModule],
    declarations: [NarikDevBusyIndicator],
    exports: [NarikDevBusyIndicator],
    providers: [],
})
export class NarikDevBusyIndicatorModule {}
