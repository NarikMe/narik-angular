import { NavigationExtras } from "@angular/router";
import { DialogRef, DialogOption } from "./DialogService";


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
    commands: any[],
    extras?: NavigationExtras,
    data?: any,
    dialogOptions?: DialogOption
  ): Promise<boolean | DialogRef<any>>;
}
