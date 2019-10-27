import {
  ApplicationUser,
  AUTHENTICATION_LOGIN_END_POINT,
  AUTHENTICATION_REFRESH_END_POINT,
  AuthenticationService,
  LoginModel,
  LoginResult,
  AUTHENTICATION_LOGOUT_END_POINT,
  DataStorageService,
  LOGIN_PAGE_URL
} from "narik-infrastructure";

import { Inject, Injectable } from "@angular/core";
import { NarikHttpService } from "narik-core";
import { first } from "rxjs/internal/operators/first";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";
import { Observable } from "rxjs/internal/Observable";
import { TOKEN_STORAGE } from "../injectionTokens";
import { Router } from "@angular/router";

@Injectable()
export class NarikJwtAuthentication extends AuthenticationService {
  private _currentUserSubject = new ReplaySubject<ApplicationUser>(1);
  private _currentUserValue: ApplicationUser;
  private _token: any;

  constructor(
    private service: NarikHttpService,
    private dataStorage: DataStorageService,
    private router: Router,
    @Inject(AUTHENTICATION_LOGIN_END_POINT) private authEndPoint: string,
    @Inject(AUTHENTICATION_LOGOUT_END_POINT) private logoutEndPoint: string,
    @Inject(AUTHENTICATION_REFRESH_END_POINT)
    private authRefreshEndPoint: string,
    @Inject(LOGIN_PAGE_URL) private loginPageUrl: string,
    @Inject(TOKEN_STORAGE)
    private tokenStorage
  ) {
    super();
    this.init();
  }

  get currentUserValue(): ApplicationUser {
    return this._currentUserValue;
  }

  get currentUser(): Observable<ApplicationUser> {
    return this._currentUserSubject.asObservable();
  }

  get token(): any {
    return this._token;
  }

  init() {
    this.dataStorage
      .getData(this.tokenStorage, {
        dataKey: "auth-token"
      })
      .subscribe(token => {
        if (token) {
          this._token = token;
          this.dataStorage
            .getData(this.tokenStorage, {
              dataKey: "current-user"
            })
            .subscribe(result => {
              this._currentUserValue = result;
              this._currentUserSubject.next(this._currentUserValue);
            });
        }
      });
  }
  login(loginmodel: LoginModel): Promise<LoginResult> {
    return new Promise<LoginResult>((resolve, reject) => {
      return this.service
        .post(this.authEndPoint, loginmodel)
        .pipe(first())
        .subscribe(
          (result: LoginResult) => {
            if (result.succeeded) {
              this._token = result.token;
              this._currentUserValue = result.loginedUser;
              this._currentUserSubject.next(this._currentUserValue);

              this.dataStorage
                .addData(this.tokenStorage, [
                  {
                    dataInfo: {
                      dataKey: "auth-token"
                    },
                    data: result.token
                  },
                  {
                    dataInfo: {
                      dataKey: "current-user"
                    },
                    data: result.loginedUser
                  }
                ])
                .pipe(first())
                .subscribe(() => {
                  resolve(result);
                });
            } else {
              resolve(result);
            }
          },
          err => reject(err)
        );
    });
  }
  logout(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
       this.service
        .post(this.logoutEndPoint, {})
        .pipe(first())
        .subscribe(result => {
          this.dataStorage
            .removeItems(this.tokenStorage, [
              {
                dataKey: "auth-token"
              },
              {
                dataKey: "current-user"
              }
            ])
            .subscribe(() => {
              this._currentUserValue = undefined;
              this.router.navigateByUrl(this.loginPageUrl);
              this._currentUserSubject.next(undefined);
              resolve(true);
            });
        });
    });
  }
  refresh(): Promise<ApplicationUser> {
    return new Promise<ApplicationUser>((resolve, reject) => {
      return this.service
        .get(this.authRefreshEndPoint)
        .pipe(first())
        .subscribe((result: LoginResult) => {
          if (result.succeeded) {
            this._currentUserValue = result.loginedUser;
            this._currentUserSubject.next(this._currentUserValue);
          }
          resolve(result.loginedUser);
        });
    });
  }
}
