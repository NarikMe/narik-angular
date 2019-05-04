import { DialogOption, DialogRef, NavigationProvider } from "narik-infrastructure";

import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Injectable()
export class NarikRouteNavigationProvider implements NavigationProvider {
  key = "";

  constructor(private router: Router) {}

  navigate(
    commands: any[],
    extras?: NavigationExtras,
    data?: any,
    dialogOptions?: DialogOption
  ): Promise<boolean | DialogRef<any>> {
    return this.router.navigate(commands, extras);
  }
}
