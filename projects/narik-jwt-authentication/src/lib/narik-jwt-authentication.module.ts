import { NarikJwtAuthenticationConfig } from "./models/narik-jwt-authentication.config";
import { ModuleWithProviders, NgModule } from "@angular/core";
import {
  AUTHENTICATION_LOGIN_END_POINT,
  AUTHENTICATION_LOGOUT_END_POINT,
  AUTHENTICATION_REFRESH_END_POINT,
  AuthenticationService,
  LOGIN_PAGE_URL
} from "narik-infrastructure";
import { TOKEN_STORAGE } from "./injectionTokens";
import { NarikJwtAuthentication } from "./services/narik-jwt-authentication.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./services/jwt.interceptor";
import { AuthErrorInterceptor } from "./services/auth-error.interceptor ";

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: []
})
export class NarikJwtAuthenticationModule {
  static forRoot(config: NarikJwtAuthenticationConfig): ModuleWithProviders<NarikJwtAuthenticationModule> {
    return {
      ngModule: NarikJwtAuthenticationModule,
      providers: [
        {
          provide: AUTHENTICATION_LOGIN_END_POINT,
          useValue: config.loginEndPoint
        },
        {
          provide: AUTHENTICATION_LOGOUT_END_POINT,
          useValue: config.logoutEndPoint
        },
        {
          provide: AUTHENTICATION_REFRESH_END_POINT,
          useValue: config.refreshEndPoint
        },
        {
          provide: LOGIN_PAGE_URL,
          useValue: config.loginPageUrl || "/"
        },
        {
          provide: TOKEN_STORAGE,
          useValue: config.tokenStorage
        },
        {
          provide: AuthenticationService,
          useClass: NarikJwtAuthentication
        },
        {
          provide: NarikJwtAuthentication,
          useExisting: AuthenticationService
        },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true }
      ]
    };
  }
}
