import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NarikUiNgBootstrapModule } from "narik-ui-ng-bootstrap";
import { NarikSwimlaneDataTableModule } from "narik-ui-swimlane";
import { COMPONENTS } from "./index";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NarikUiNgBootstrapModule,
    NarikSwimlaneDataTableModule
  ],
  declarations: [COMPONENTS],
  exports: [],
  providers: [],
  entryComponents: [COMPONENTS]
})
export class ShareModule {}
