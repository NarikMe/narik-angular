import { Routes } from '@angular/router';

export function findBestRouteAfterLogin(
    routes: Routes,
    roles: string[]
): string {
    if (!roles || !roles[0]) {
        return null;
    }
    return routes
        .filter((x) => {
            return (
                x.data &&
                x.data.authorizeTag &&
                x.data.authorizeTag.indexOf(roles[0]) >= 0
            );
        })
        .map((x) => x.path)[0];
}
