import { Component, OnInit, Input, Injector } from "@angular/core";

import { NarikTabOutlet } from "@narik/ui-core";

@Component({
  selector: "narik-prime-tab-outlet , narik-tab-outlet",
  templateUrl: "narik-prime-tab-outlet.component.html"
})
export class NarikPrimeTabOutlet extends NarikTabOutlet implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  handleClose(e) {
    this.removeTab(e.index);
    e.close();
    if (e.index === 0) {
      if (this.tabs.length > 0) {
        this.selectedIndex = 0;
      }
    } else {
      this.selectedIndex = e.index - 1;
    }
  }

  handleChange(e) {
    this.selectedIndex = e.index;
  }
}
