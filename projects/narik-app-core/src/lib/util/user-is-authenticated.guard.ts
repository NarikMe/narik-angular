import { AuthenticationService, LOGIN_PAGE_URL } from '@narik/infrastructure';

import { Inject, Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class UserIsAuthenticatedGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        @Inject(LOGIN_PAGE_URL) private loginPageUrl: string
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.currentUserValue) {
            return true;
        } else {
            this.router.navigate([this.loginPageUrl], {
                queryParams: { returnUrl: state.url },
            });
            return false;
        }
    }
}
