import { NgModule } from "@angular/core";
import { COMPONENTS, EXPORT_COMPONENTS } from "./index";
import { DIRECTIVES } from "./directives/index";
import { EXPORT_DIRECTIVES } from "./directives/index";

@NgModule({
  imports: [],
  declarations: [COMPONENTS, DIRECTIVES],
  exports: [EXPORT_COMPONENTS, EXPORT_DIRECTIVES],
  providers: []
})
export class NarikCommonModule {}
