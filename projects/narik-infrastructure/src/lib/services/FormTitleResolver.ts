import { ActivatedRouteSnapshot } from '@angular/router';

export abstract class FormTitleResolver {
    abstract resolveTitle(routeSnapshot: ActivatedRouteSnapshot, path?: string);
}
