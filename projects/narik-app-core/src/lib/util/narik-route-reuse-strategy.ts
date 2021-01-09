import {
    ActivatedRouteSnapshot,
    RouteReuseStrategy,
    DetachedRouteHandle,
} from '@angular/router';

export class NarikRouteReuseStrategy implements RouteReuseStrategy {
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }
    store(
        route: ActivatedRouteSnapshot,
        detachedTree: DetachedRouteHandle
    ): void {}
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        return null;
    }
    shouldReuseRoute(
        future: ActivatedRouteSnapshot,
        curr: ActivatedRouteSnapshot
    ): boolean {
        if (future.routeConfig && curr.routeConfig) {
            if (
                future.routeConfig.loadChildren &&
                curr.routeConfig.loadChildren
            ) {
                return future.routeConfig === curr.routeConfig;
            }
            if (future.routeConfig.children && curr.routeConfig.children) {
                return future.routeConfig === curr.routeConfig;
            }
        }
        return curr.routeConfig === null && future.routeConfig === null;
    }
}
