import { MetaDataService, MODULE_UI_KEY } from "@narik/infrastructure";

import { Component, Inject } from "@angular/core";

@Component({
  templateUrl: "main.component.html"
})
export class MainComponent {
  menuItems: any[];

  /**
   *
   */
  constructor(
    metaDataService: MetaDataService,
    @Inject(MODULE_UI_KEY) moduleKey: string
  ) {
    this.menuItems = metaDataService.getValue<any[]>(moduleKey, "menuItems");
  }
}
