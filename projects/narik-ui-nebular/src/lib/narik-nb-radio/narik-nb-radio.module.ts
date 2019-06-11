import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NbRadioModule } from "@nebular/theme";

import { NarikNebularBusyIndicatorModule } from "../narik-nb-busy-indicator/narik-nb-busy-indicator.module";
import { NarikNebularRadioGroup } from "./narik-nb-radio-group.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbRadioModule,
    NarikNebularBusyIndicatorModule
  ],
  declarations: [NarikNebularRadioGroup],
  exports: [NarikNebularRadioGroup],
  providers: []
})
export class NarikNebularRadioGroupModule {}
