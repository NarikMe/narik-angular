import {
  LOGIN_PAGE_URL,
  DialogService,
  AuthorizationService
} from "@narik/infrastructure";

import { Inject, Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { isArray } from "@narik/common";
import { of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class UserIsAuthorizedGuard implements CanActivate {
  constructor(
    private authorizationService: AuthorizationService,
    private dialogService: DialogService,
    private router: Router,
    @Inject(LOGIN_PAGE_URL) private loginPageUrl: string
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.data && route.data.authorizeTag && isArray(route.data.authorizeTag)) {
      return this.authorizationService.hasAccess(route.data.authorizeTag).pipe(
        tap((x: boolean) => {
          if (!x) {
            this.redirectToLogin(state);
          }
        })
      );
    } else {
      return of(true);
    }
  }

  redirectToLogin(state: RouterStateSnapshot) {
    this.dialogService.error("errors.STATUS_401");
    this.router.navigate([this.loginPageUrl]);
    // this.router.navigate([this.loginPageUrl], {
    //   queryParams: { returnUrl: state.url }
    // });
  }
}
