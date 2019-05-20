import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NarikSwimlaneSelect } from "./narik-swimlane-select.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NarikSwimlaneSelect],
  exports: [NarikSwimlaneSelect],
  providers: []
})
export class NarikSwimlaneSelectModule {}
