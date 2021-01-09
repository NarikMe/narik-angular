import { isArray, isString } from '@narik/common';
import {
    AuthenticationService,
    AuthorizationService,
} from '@narik/infrastructure';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable()
export class NarikRoleBasedAuthorizationService extends AuthorizationService {
    /**
     *
     */
    constructor(private authenticationService: AuthenticationService) {
        super();
    }
    hasAccess(itemKey: any): Observable<boolean> {
        if (
            this.authenticationService.currentUserValue &&
            this.authenticationService.currentUserValue.roles
        ) {
            const key = this.extractItemKey(itemKey);
            if (key) {
                const that = this;
                return of(
                    !!key.filter(function (n) {
                        return (
                            that.authenticationService.currentUserValue.roles.indexOf(
                                n
                            ) > -1
                        );
                    })[0]
                );
            }
        }
        return of(false);
    }

    protected extractItemKey(itemKey: any): string[] {
        if (isString(itemKey)) {
            return [itemKey];
        } else if (isArray(itemKey)) {
            return itemKey;
        }
        return null;
    }
}
