import { Observable } from "rxjs/internal/Observable";

/**
 *
 * A service that applications can use to check authorization state of resources.
 */
export abstract class AuthorizationService {

  /**
   * Determines whether user has access to resource key or not.
   * @param itemKey. The item key that must it's Authorization will be checked.
   * @returns An `Observable` that returns authorization access state.
   */
  abstract hasAccess(itemKey: any): Observable<boolean>;
}
