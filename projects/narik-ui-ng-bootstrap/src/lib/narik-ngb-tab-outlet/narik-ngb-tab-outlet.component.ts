import { Component, OnInit, Injector, ViewChild, NgZone } from "@angular/core";

import { NarikTabOutlet } from "@narik/ui-core";
import { NgbNav } from "@ng-bootstrap/ng-bootstrap";
import { take } from "rxjs/operators";

@Component({
  selector: "narik-ngb-tab-outlet , narik-tab-outlet",
  templateUrl: "narik-ngb-tab-outlet.component.html",
  styleUrls: ["narik-ngb-tab-outlet.component.css"],
})
export class NarikNgbTabOutlet extends NarikTabOutlet implements OnInit {
  @ViewChild("nav", { static: true }) public navElement: NgbNav;

  constructor(injector: Injector, private readonly zone: NgZone) {
    super(injector);
  }

  removeTabItem(index) {
    this.removeTab(index);
    return false;
  }

  addView(tab: any) {
    super.addView(tab);
    this.zone.onStable
      .pipe(take(1))
      .subscribe(() => this.navElement.select(tab.uniqueId));
  }
}
