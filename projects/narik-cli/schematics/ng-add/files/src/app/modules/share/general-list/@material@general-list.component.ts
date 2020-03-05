import { NarikUiListForm } from "@narik/ui-lib";
import { Component, Injector } from "@angular/core";
import { NarikListUi } from "../../../templates/template.decorator";
import { DynamicForm } from "@narik/core";

@DynamicForm("GeneralListComponent")
@NarikListUi()
@Component({
  templateUrl: "general-list.component.html"
})
export class GeneralListComponent extends NarikUiListForm<any> {
  constructor(injector: Injector) {
    super(injector);
  }
}
