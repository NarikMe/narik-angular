import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";

import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { DialogService } from "@narik/infrastructure";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private dialogService: DialogService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 403) {
          this.dialogService.error("errors.STATUS_401");
        }
        if (err.status === 400) {
          if (err.error && err.error.errors) {
            this.dialogService.error(err.error.errors);
          }
        }
        return throwError(err);
      })
    );
  }
}
