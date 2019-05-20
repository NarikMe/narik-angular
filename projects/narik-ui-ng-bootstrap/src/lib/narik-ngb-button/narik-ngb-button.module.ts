import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { NarikNgbButtonComponent } from "./narik-ngb-button.component";
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, NgbTooltipModule],
  declarations: [NarikNgbButtonComponent],
  exports: [NarikNgbButtonComponent],
  providers: []
})
export class NarikNgbButtonModule {}
