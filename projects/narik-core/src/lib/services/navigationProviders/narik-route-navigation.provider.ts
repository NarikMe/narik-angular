import {
    DialogOption,
    DialogRef,
    NavigationProvider,
    NarikOutlet,
} from '@narik/infrastructure';

import { Injectable } from '@angular/core';
import { NavigationExtras, Router, UrlTree } from '@angular/router';
import { isArray } from '@narik/common';

@Injectable()
export class NarikRouteNavigationProvider implements NavigationProvider {
    key = 'route';
    outlet: NarikOutlet;

    constructor(private router: Router) {}

    createNavigationCommand(path: string): any[] | string | UrlTree {
        return ['../' + path];
    }

    navigate(
        commands: any[] | string | UrlTree,
        extras?: NavigationExtras,
        data?: any,
        dialogOptions?: DialogOption
    ): Promise<boolean | DialogRef<any>> {
        extras = extras || {};
        if (data) {
            (extras as any).data = data;
        }
        if (isArray(commands)) {
            return this.router.navigate(commands as any[], extras);
        } else {
            return this.router.navigateByUrl(
                commands as string | UrlTree,
                extras
            );
        }
    }
}
