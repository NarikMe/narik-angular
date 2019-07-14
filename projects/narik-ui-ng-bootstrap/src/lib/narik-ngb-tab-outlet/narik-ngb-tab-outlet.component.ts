import { Component, OnInit, Injector, ViewChild, NgZone } from "@angular/core";

import { NarikTabOutlet } from "narik-ui-core";
import { NavigationService } from "narik-infrastructure";
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { take } from "rxjs/internal/operators/take";

@Component({
  selector: "narik-ngb-tab-outlet , narik-tab-outlet",
  templateUrl: "narik-ngb-tab-outlet.component.html",
  styleUrls: ["narik-ngb-tab-outlet.component.css"]
})
export class NarikNgbTabOutlet extends NarikTabOutlet implements OnInit {
  @ViewChild("tabset", { static: true }) public tabsElement: NgbTabset;

  constructor(
    injector: Injector,
    navigationService: NavigationService,
    private readonly zone: NgZone
  ) {
    super(injector, navigationService);
  }

  removeTabItem(index) {
    this.removeTab(index);
    return false;
  }

  addView(tab: any) {
    super.addView(tab);
    this.zone.onStable
      .pipe(take(1))
      .subscribe(() => this.tabsElement.select(tab.uniqueId));
  }
}
