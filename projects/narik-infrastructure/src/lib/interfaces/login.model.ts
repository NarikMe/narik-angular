/**
 * Login model
 */
export interface LoginModel {
    userName: string;
    password: string;
}

/**
 * Application user
 */
export interface ApplicationUser {
    userId: string;
    title: string;
    userName: string;
    roles: string[];
}

/**
 * Login result
 */
export interface LoginResult {
    succeeded: boolean;
    errors: any[];
    loginedUser: ApplicationUser;
    token: string;
}
