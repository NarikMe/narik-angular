import { NarikOutlet, NavigationService } from "narik-infrastructure";
import { NarikUiComponent } from "../base/narik-ui-component";
import { Injector } from "@angular/core";
import { Router, UrlTree, NavigationExtras } from "@angular/router";

export abstract class NarikTabOutlet extends NarikUiComponent
  implements NarikOutlet {
  tabs = [];
  selectedIndex: number;

  constructor(
    injector: Injector,
    private navigationService: NavigationService
  ) {
    super(injector);
    this.navigationService.setOutlet("tab", this);

    (Router as any).prototype.navigate = (commands, extras) => {
      this.navigationService.navigate(commands, "tab", extras);
    };
    (Router as any).prototype.navigateByUrl = (
      url: string | UrlTree,
      extras?: NavigationExtras
    ) => {
      this.navigationService.navigate(url, "tab", extras);
    };
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  addView(tab: any) {
    this.tabs.push(tab);
    this.selectedIndex = this.tabs.length - 1;
  }

  trackByFn(index, item) {
    return item.uniqueId;
  }
}
