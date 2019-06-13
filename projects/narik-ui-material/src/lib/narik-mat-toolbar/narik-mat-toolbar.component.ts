import { NarikToolBar } from "narik-ui-core";
import { Component, Injector, ViewContainerRef } from "@angular/core";

@Component({
  selector: "narik-toolbar , narik-mat-toolbar",
  templateUrl: "narik-mat-toolbar.component.html"
})
export class NarikMatToolBar extends NarikToolBar {
  constructor(injector: Injector, viewContainerRef: ViewContainerRef) {
    super(injector, viewContainerRef);
    this.cssClass = "narik-mat-toolbar";
    this.itemsStyle = "mat-stroked-button";
  }
}
