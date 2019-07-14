import { NavigationExtras, UrlTree } from "@angular/router";
import { DialogOption, DialogRef } from "./DialogService";
import { NarikOutlet } from "../interfaces/narik-outlet";

/**
 * Navigation service
 */
export abstract class NavigationService {
  /**
   * Navigates navigation service
   * @param commands
   * @param [providerKey]
   * @param [extras]
   * @param [data]
   * @param [dialogOptions]
   * @returns navigate
   */
  abstract navigate(
    commands: any[] | string | UrlTree,
    providerKey?: string,
    extras?: NavigationExtras,
    data?: any,
    dialogOptions?: DialogOption
  ): Promise<boolean | DialogRef<any>>;

  abstract setOutlet(providerKey: string, outlet: NarikOutlet);
  abstract createNavigationCommand(
    providerKey: string,
    path: string
  ): any[] | string | UrlTree;
}
