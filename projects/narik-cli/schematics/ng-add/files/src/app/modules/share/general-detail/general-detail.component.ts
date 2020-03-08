import { Component, Injector } from "@angular/core";
import { NarikUiDetailForm } from "@narik/ui-lib";
import { NarikBaseTemplate } from "@narik/core";
import { DynamicForm } from "@narik/core";

@DynamicForm("GeneralDetailComponent")
@NarikBaseTemplate("NarikDetailUi")
@Component({
  templateUrl: "general-detail.component.html"
})
export class GeneralDetailComponent extends NarikUiDetailForm<any> {
  constructor(injector: Injector) {
    super(injector);
  }
}
