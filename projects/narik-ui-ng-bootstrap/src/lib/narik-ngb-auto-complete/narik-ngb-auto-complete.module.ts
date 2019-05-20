import { NarikNgbAutoComplete } from "./narik-ngb-auto-complete.component";
import { NgModule } from "@angular/core";

import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule, NgbTypeaheadModule],
  declarations: [NarikNgbAutoComplete],
  exports: [NarikNgbAutoComplete],
  providers: []
})
export class NarikNgbAutoCompleteModule {}
