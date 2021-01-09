import { FormTitleResolver } from '@narik/infrastructure';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()
export class NarikFormTitleResolver extends FormTitleResolver {
    constructor(private translateService: TranslateService) {
        super();
    }

    resolveTitle(routeSnapshot: ActivatedRouteSnapshot, path?: string) {
        if (routeSnapshot) {
            const title =
                (routeSnapshot.data && routeSnapshot.data.title) ||
                (routeSnapshot.url[0] && routeSnapshot.url[0].path);
            if (title) {
                return this.translateService.instant(this.getFirst(title));
            }
        }
        if (path) {
            return this.translateService.instant(this.getFirst(path));
        }
        return '';
    }
    private getFirst(title: string): string {
        return title ? title.split('-')[0] : '';
    }
}
