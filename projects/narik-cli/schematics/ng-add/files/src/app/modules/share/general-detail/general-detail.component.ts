import { Component, Injector } from "@angular/core";
import { NarikUiDetailForm } from "narik-ui-lib";
import { NarikBaseTemplate } from "narik-core";

// @NarikDetailUi()
@NarikBaseTemplate("NarikDetailUi")
@Component({
  templateUrl: "general-detail.component.html"
})
export class GeneralDetailComponent extends NarikUiDetailForm<any> {
  static readonly COMPONENT_NAME = "GeneralDetailComponent";

  constructor(injector: Injector) {
    super(injector);
  }
}
