import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { NarikCommonModule } from "narik-common";
import { NarikDevTabOutlet } from "./narik-dev-tab-outlet.component";
import { DxTabPanelModule } from "devextreme-angular/ui/tab-panel";

@NgModule({
  imports: [CommonModule, TranslateModule, NarikCommonModule, DxTabPanelModule],
  declarations: [NarikDevTabOutlet],
  exports: [NarikDevTabOutlet],
  providers: []
})
export class NarikDevTabOutletModule {}
