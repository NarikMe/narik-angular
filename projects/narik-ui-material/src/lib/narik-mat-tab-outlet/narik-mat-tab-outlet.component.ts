import { Component, OnInit, Input, Injector } from "@angular/core";

import { NarikTabOutlet } from "@narik/ui-core";

@Component({
  selector: "narik-mat-tab-outlet , narik-tab-outlet",
  templateUrl: "narik-mat-tab-outlet.component.html"
})
export class NarikMatTabOutlet extends NarikTabOutlet implements OnInit {
  @Input()
  isLabel100Percent = true;

  @Input()
  animationDuration = "0ms";
  /**
   *
   */
  constructor(injector: Injector) {
    super(injector);
  }
}
