import {
  DialogOption,
  DialogRef,
  NavigationProvider
} from "narik-infrastructure";

import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Injectable()
export class NarikRouteNavigationProvider implements NavigationProvider {
  key = "route";

  constructor(private router: Router) {}

  navigate(
    commands: any[],
    extras?: NavigationExtras,
    data?: any,
    dialogOptions?: DialogOption
  ): Promise<boolean | DialogRef<any>> {
    extras = extras || {};
    if (data) {
      (extras as any).data = data;
    }
    return this.router.navigate(commands, extras);
  }
}
