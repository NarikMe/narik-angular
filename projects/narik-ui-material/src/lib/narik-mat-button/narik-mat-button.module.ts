import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { NarikMatButtonComponent } from "./narik-mat-button.component";

@NgModule({
  imports: [CommonModule,  MatButtonModule, MatIconModule],
  declarations: [NarikMatButtonComponent],
  exports: [NarikMatButtonComponent],
  providers: []
})
export class NarikMatButtonModule {}
