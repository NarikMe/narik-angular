import {
  DialogOption,
  DialogRef,
  DialogService,
  NavigationProvider
} from "@narik/infrastructure";

import { Injectable } from "@angular/core";
import {
  NavigationExtras,
  PRIMARY_OUTLET,
  Router,
  UrlSegmentGroup,
  ActivatedRoute,
  UrlTree
} from "@angular/router";
import { NarikBaseNavigationProvider } from "./narik-base-navigation.provider";
import { isArray, isString } from "@narik/common";

@Injectable()
export class NarikDialogNavigationProvider extends NarikBaseNavigationProvider
  implements NavigationProvider {
  key = "dialog";

  constructor(private dialogService: DialogService, router: Router) {
    super(router);
  }

  createNavigationCommand(path: string): any[] | string | UrlTree {
    return [path];
  }
  navigate(
    commands: any[] | string | UrlTree,
    extras?: NavigationExtras,
    data?: any,
    dialogOptions?: DialogOption
  ): Promise<boolean | DialogRef<any>> {
    return new Promise<DialogRef<any>>((resolve, reject) => {
      let tree: UrlTree;
      if (isArray(commands)) {
        tree = this.router.createUrlTree(commands as any[], extras);
      } else if (isString(commands)) {
        tree = this.router.parseUrl(commands as string);
      } else {
        tree = commands as UrlTree;
      }

      const primary: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];

      const route = this.findRoute(
        this.router.config,
        primary.segments,
        primary
      );
      if (route && route.route) {
        const dialog = this.dialogService.showDialog(
          route.route.component,
          data ? data["__dialogTitle"] : undefined,
          {
            parameters: {
              routeByCustomProvider: true,
              path: primary.segments[0].path,
              ...route.route.data,
              ...data
            }
          },
          [],
          dialogOptions || {
            isFullScreen: false,
            showBackdrop: true,
            disableAutoClose: true
          },
          undefined,
          undefined,
          [{ provide: ActivatedRoute, useValue: extras.relativeTo }]
        );
        resolve(dialog);
      } else {
        reject(false);
      }
    });
  }
}
