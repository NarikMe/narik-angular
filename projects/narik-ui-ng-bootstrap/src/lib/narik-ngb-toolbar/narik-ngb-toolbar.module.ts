import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikNgbToolBar } from "./narik-ngb-toolbar.component";
import { NarikNgbButtonModule } from "../narik-ngb-button/narik-ngb-button.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NarikNgbButtonModule,
    TranslateModule
  ],
  declarations: [NarikNgbToolBar],
  exports: [NarikNgbToolBar],
  providers: []
})
export class NarikNgbToolbarModule {}
