import { NarikSwimlaneAutoComplete } from "./narik-swimlane-auto-complete.component";
import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NarikSwimlaneAutoComplete],
  exports: [NarikSwimlaneAutoComplete],
  providers: []
})
export class NarikSwimlaneAutoCompleteModule {}
