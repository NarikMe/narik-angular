import { NgModule } from "@angular/core";

import { MatToolbarModule } from "@angular/material";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikMatToolBar } from "./narik-mat-toolbar.component";
import { NarikMatButtonModule } from "../narik-mat-button/narik-mat-button.module";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    NarikMatButtonModule,
    MatTooltipModule,
    TranslateModule,
    MatDividerModule
  ],
  declarations: [NarikMatToolBar],
  exports: [NarikMatToolBar],
  providers: []
})
export class NarikMatToolbarModule {}
