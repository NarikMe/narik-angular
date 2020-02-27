import { COMPONENTS } from "./index";
import { NgModule } from "@angular/core";
import { NarikUiDevextremeModule } from "narik-ui-devextreme";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DYNAMIC_COMPONENTS } from "@narik/infrastructure";
import { GeneralDetailComponent } from "./general-detail/general-detail.component";
import { GeneralListComponent } from "./general-list/general-list.component";

@NgModule({
  imports: [CommonModule, FormsModule, NarikUiDevextremeModule],
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
