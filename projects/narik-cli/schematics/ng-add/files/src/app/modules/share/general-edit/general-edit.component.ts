import { Component, Injector } from "@angular/core";
import { NarikUiEditForm } from "@narik/ui-lib";
import { NarikBaseTemplate } from "@narik/core";
import { DynamicForm } from "@narik/core";

@DynamicForm("GeneralEditComponent")
@NarikBaseTemplate("NarikEditUi")
@Component({
  templateUrl: "general-edit.component.html"
})
export class GeneralEditComponent extends NarikUiEditForm<any> {
  constructor(injector: Injector) {
    super(injector);
  }
}
