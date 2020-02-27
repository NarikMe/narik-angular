import { NarikUiPrimeModule } from "narik-ui-primeng";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DYNAMIC_COMPONENTS } from "@narik/infrastructure";
import { GeneralDetailComponent } from "./general-detail/general-detail.component";
import { GeneralListComponent } from "./general-list/general-list.component";

import { COMPONENTS } from "./index";

@NgModule({
  imports: [CommonModule, FormsModule, NarikUiPrimeModule],
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
