import { NarikUiPrimeModule } from "narik-ui-primeng";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { COMPONENTS } from "./index";

@NgModule({
  imports: [CommonModule, FormsModule, NarikUiPrimeModule],
  declarations: [COMPONENTS],
  exports: [],
  providers: [],
  entryComponents: [COMPONENTS]
})
export class ShareModule {}
