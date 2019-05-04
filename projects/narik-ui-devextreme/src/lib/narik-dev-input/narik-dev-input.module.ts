import { NgModule } from "@angular/core";

import { DxTextBoxModule } from "devextreme-angular/ui/text-box";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikDevInput } from "./narik-dev-input.component";

@NgModule({
  imports: [CommonModule, FormsModule, DxTextBoxModule],
  declarations: [NarikDevInput],
  exports: [NarikDevInput],
  providers: []
})
export class NarikDevInputModule {}
