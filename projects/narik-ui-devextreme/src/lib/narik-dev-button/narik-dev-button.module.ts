import { NgModule } from "@angular/core";

import { DxButtonModule } from "devextreme-angular/ui/button";
import { DxLoadIndicatorModule } from "devextreme-angular/ui/load-indicator";
import { CommonModule } from "@angular/common";
import { NarikDevButtonComponent } from "./narik-dev-button.component";

@NgModule({
  imports: [CommonModule, DxButtonModule, DxLoadIndicatorModule],
  declarations: [NarikDevButtonComponent],
  exports: [NarikDevButtonComponent],
  providers: []
})
export class NarikDevButtonModule {}
