import { NarikUiListForm } from "narik-ui-lib";

import { Component, Injector } from "@angular/core";

import { NarikListUi } from "../../../templates/template.decorator";

@NarikListUi()
@Component({
  templateUrl: "general-list.component.html"
})
export class GeneralListComponent extends NarikUiListForm<any> {
  static readonly COMPONENT_NAME = "GeneralListComponent";
  constructor(injector: Injector) {
    super(injector);
  }
}
