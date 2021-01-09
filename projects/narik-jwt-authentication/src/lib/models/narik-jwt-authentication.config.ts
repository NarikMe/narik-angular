export interface NarikJwtAuthenticationConfig {
    loginEndPoint: string;
    logoutEndPoint: string;
    refreshEndPoint: string;
    loginPageUrl: string;
    tokenStorage:
        | 'memory'
        | 'localStorage'
        | 'sessionStorage'
        | 'clientStorage';
}
