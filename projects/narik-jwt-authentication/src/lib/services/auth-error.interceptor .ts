import { Injectable, Inject, Optional } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";

import { NarikJwtAuthentication } from "./narik-jwt-authentication.service";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { Router, RouterStateSnapshot } from "@angular/router";
import { LOGIN_PAGE_URL } from "@narik/infrastructure";

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: NarikJwtAuthentication,
    @Optional() private state: RouterStateSnapshot,
    private router: Router,
    @Inject(LOGIN_PAGE_URL) private loginPageUrl: string
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.authenticationService.logout();
          this.router.navigate([this.loginPageUrl], {
            queryParams: { returnUrl: this.state ? this.state.url : "" }
          });
        }
        return throwError(err);
      })
    );
  }
}
