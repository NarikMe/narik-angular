import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikNebularSelect } from "./narik-nb-select.component";
import { NbSelectModule } from '@nebular/theme';

@NgModule({
  imports: [CommonModule, FormsModule, NbSelectModule],
  declarations: [NarikNebularSelect],
  exports: [NarikNebularSelect],
  providers: []
})
export class NarikNebularSelectModule {}
