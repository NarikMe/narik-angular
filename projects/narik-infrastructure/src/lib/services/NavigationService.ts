import { NavigationExtras } from "@angular/router";
import { DialogOption, DialogRef } from "./DialogService";


/**
 * Navigation service
 */
export abstract class  NavigationService {

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
    commands: any[],
    providerKey?: string,
    extras?: NavigationExtras,
    data?: any,
    dialogOptions?: DialogOption
  ): Promise<boolean | DialogRef<any>>;
}
