import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { TranslateModule } from "@ngx-translate/core";
import { NarikMatTabOutlet } from "./narik-mat-tab-outlet.component";
import { NarikMatTabOutletHeaderComponent } from "./narik-mat-tab-outlet-close-header.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NarikCommonModule } from "@narik/common";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    TranslateModule,
    MatIconModule,
    MatTooltipModule,
    NarikCommonModule
  ],
  declarations: [NarikMatTabOutlet, NarikMatTabOutletHeaderComponent],
  exports: [NarikMatTabOutlet, NarikMatTabOutletHeaderComponent],
  providers: []
})
export class NarikMatTabOutletModule {}
