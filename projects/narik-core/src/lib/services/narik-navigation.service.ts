import {
  DialogOption,
  DialogRef,
  NavigationProvider,
  NavigationService
} from "narik-infrastructure";

import { Inject, Injectable } from "@angular/core";
import { NavigationExtras } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class NarikNavigationService implements NavigationService {
  private navigationProviders = new Map<string, NavigationProvider>();

  constructor(@Inject(NavigationProvider) providers: NavigationProvider[]) {
    providers.forEach(x => this.navigationProviders.set(x.key, x));
  }
  navigate(
    commands: any[],
    providerKey: string = "",
    extras?: NavigationExtras,
    data?: any,
    dialogOptions?: DialogOption
  ): Promise<boolean | DialogRef<any>> {
    return this.navigationProviders
      .get(providerKey)
      .navigate(commands, extras, data, dialogOptions);
  }
}
