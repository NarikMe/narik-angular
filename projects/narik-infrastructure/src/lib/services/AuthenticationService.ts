import { LoginModel } from "../interfaces/login.model";
import { Observable } from "rxjs";

import { ApplicationUser, LoginResult } from "../interfaces/login.model";

/**
 * A service that applications can use to check authentication state of current user.
 */
export abstract class AuthenticationService {
  /**
   * Current user value of authentication service
   */
  abstract get currentUserValue(): ApplicationUser;

  /**
   * Current user of authentication service
   *
   * An `Observable` that emit whenever currentUser changed.
   */
  abstract get currentUser(): Observable<ApplicationUser>;

  /**
   * Logins authentication service
   * @param loginmodel Information needed for login
   * @returns login
   */
  abstract login(loginmodel: LoginModel): Promise<LoginResult>;

  /**
   * Logouts authentication service
   * @returns logout
   */
  abstract logout(): Promise<boolean>;

  /**
   * Refresh authentication service
   * @returns refresh
   */
  abstract refresh(): Promise<ApplicationUser>;
}
