import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikNebularToolBar } from "./narik-nb-toolbar.component";

import { NbActionsModule, NbCardModule, NbTooltipModule, NbIconModule } from "@nebular/theme";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbActionsModule,
    NbCardModule,
    NbTooltipModule,
    NbIconModule,
    TranslateModule
  ],
  declarations: [NarikNebularToolBar],
  exports: [NarikNebularToolBar],
  providers: []
})
export class NarikNebularToolbarModule {}
