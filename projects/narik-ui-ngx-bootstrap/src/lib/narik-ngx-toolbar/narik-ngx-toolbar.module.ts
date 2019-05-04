import { NgModule } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikNgxToolBar } from "./narik-ngx-toolbar.component";
import { NarikNgxButtonModule } from "../narik-ngx-button/narik-ngx-button.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NarikNgxButtonModule,
    TranslateModule
  ],
  declarations: [NarikNgxToolBar],
  exports: [NarikNgxToolBar],
  providers: []
})
export class NarikNgxToolbarModule {}
