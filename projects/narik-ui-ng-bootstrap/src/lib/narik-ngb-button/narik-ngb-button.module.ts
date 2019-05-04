import { NgModule } from "@angular/core";

import { DxLoadIndicatorModule } from "devextreme-angular/ui/load-indicator";
import { CommonModule } from "@angular/common";
import { NarikNgbButtonComponent } from "./narik-ngb-button.component";

@NgModule({
  imports: [CommonModule, DxLoadIndicatorModule],
  declarations: [NarikNgbButtonComponent],
  exports: [NarikNgbButtonComponent],
  providers: []
})
export class NarikNgbButtonModule {}
