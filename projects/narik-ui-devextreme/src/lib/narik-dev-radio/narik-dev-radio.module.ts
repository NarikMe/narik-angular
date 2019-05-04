import { NgModule } from "@angular/core";

import { DxRadioGroupModule } from "devextreme-angular/ui/radio-group";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikDevRadioGroup } from "./narik-dev-radio-group.component";

@NgModule({
  imports: [CommonModule, FormsModule, DxRadioGroupModule],
  declarations: [NarikDevRadioGroup],
  exports: [NarikDevRadioGroup],
  providers: []
})
export class NarikDevRadioGroupModule {}
