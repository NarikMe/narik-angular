import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { NarikUiNgBootstrapModule } from "narik-ui-ng-bootstrap";
import { NarikSwimlaneDataTableModule } from "narik-ui-swimlane";
import { COMPONENTS } from "./index";
import { DYNAMIC_COMPONENTS } from "@narik/infrastructure";
import { GeneralDetailComponent } from "./general-detail/general-detail.component";
import { GeneralListComponent } from "./general-list/general-list.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NarikUiNgBootstrapModule,
    NarikSwimlaneDataTableModule
  ],
  declarations: [COMPONENTS],
  exports: [],
  providers: [
    {
      provide: DYNAMIC_COMPONENTS,
      useValue: [GeneralDetailComponent, GeneralListComponent],
      multi: true
    }
  ],
  entryComponents: [COMPONENTS]
})
export class ShareModule {}
