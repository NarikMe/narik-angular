import { NavigationExtras, UrlTree } from "@angular/router";
import { DialogRef, DialogOption } from "./DialogService";
import { NarikOutlet } from "../interfaces/narik-outlet";

/**
 * Navigation provider
 */
export abstract class NavigationProvider {
  /**
   * Key  of navigation provider
   */
  readonly key: string;

  /**
   * Navigates navigation provider
   * @param commands
   * @param [extras]
   * @param [data]
   * @param [dialogOptions]
   * @returns navigate
   */
  abstract navigate(
    commands: any[] | string | UrlTree,
    extras?: NavigationExtras,
    data?: any,
    dialogOptions?: DialogOption
  ): Promise<boolean | DialogRef<any>>;
  abstract createNavigationCommand(path: string): any[] | string | UrlTree;
  abstract set outlet(value: NarikOutlet);
}
