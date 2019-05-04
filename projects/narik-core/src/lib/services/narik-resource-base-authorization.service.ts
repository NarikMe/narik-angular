import { isString, isArray } from "narik-common";
import { AuthorizationService } from "narik-infrastructure";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { Injectable } from "@angular/core";

@Injectable()
export class NarikResourceBasedAuthorizationService extends AuthorizationService {
  /**
   *
   */
  constructor() {
    super();
  }
  hasAccess(itemKey: any): Observable<boolean> {
    const key = this.extractItemKey(itemKey);
    return of(false);
  }

  protected extractItemKey(itemKey: any): { key: string; action?: string }[] {
    if (isString(itemKey)) {
      return [
        {
          key: itemKey
        }
      ];
    } else if (isArray(itemKey)) {
      return itemKey;
    }
    return null;
  }
}
