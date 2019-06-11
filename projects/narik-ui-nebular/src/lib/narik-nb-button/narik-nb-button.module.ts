import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { NarikNebularButtonComponent } from "./narik-nb-button.component";
import { NbButtonModule, NbIconModule } from "@nebular/theme";

@NgModule({
  imports: [CommonModule, NbButtonModule, NbIconModule],
  declarations: [NarikNebularButtonComponent],
  exports: [NarikNebularButtonComponent],
  providers: []
})
export class NarikNebularButtonModule {}
