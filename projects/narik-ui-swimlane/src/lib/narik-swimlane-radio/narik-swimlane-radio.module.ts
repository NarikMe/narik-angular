import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikSwimlaneRadioGroup } from "./narik-swimlane-radio-group.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NarikSwimlaneRadioGroup],
  exports: [NarikSwimlaneRadioGroup],
  providers: []
})
export class NarikSwimlaneRadioGroupModule {}
