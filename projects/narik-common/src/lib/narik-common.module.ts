import { NgModule } from "@angular/core";
import { COMPONENTS, EXPORT_COMPONENTS, PIPES } from "./index";
import { DIRECTIVES } from "./directives/index";
import { EXPORT_DIRECTIVES } from "./directives/index";

@NgModule({
  imports: [],
  declarations: [COMPONENTS, DIRECTIVES, PIPES],
  exports: [EXPORT_COMPONENTS, EXPORT_DIRECTIVES, PIPES],
  providers: []
})
export class NarikCommonModule {}
