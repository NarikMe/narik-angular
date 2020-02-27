import { Component, OnInit, Input, Injector } from "@angular/core";

import { NarikTabOutlet } from "@narik/ui-core";


@Component({
  selector: "narik-dev-tab-outlet , narik-tab-outlet",
  templateUrl: "narik-dev-tab-outlet.component.html",
  styleUrls: ["narik-dev-tab-outlet.component.css"]
})
export class NarikDevTabOutlet extends NarikTabOutlet implements OnInit {
  @Input()
  animationEnabled = false;
  constructor(injector: Injector) {
    super(injector);
  }

  onSelectionChanged(e) {
    const selectedItem = e.addedItems[0];
    if (selectedItem) {
      const pos = this.tabs.indexOf(selectedItem);
      if (pos >= 0 && pos < this.tabs.length) {
        this.selectedIndex = pos;
      }
    }
  }
}
