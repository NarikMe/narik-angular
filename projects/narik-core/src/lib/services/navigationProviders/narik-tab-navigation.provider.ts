import {
  DialogOption,
  DialogRef,
  NavigationProvider,
  FormTitleResolver
} from "narik-infrastructure";

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
import { isArray, isString } from "narik-common";
import { UUID } from "angular2-uuid";

@Injectable()
export class NarikTabNavigationProvider extends NarikBaseNavigationProvider
  implements NavigationProvider {
  key = "tab";

  constructor(router: Router, private formTitleResolver: FormTitleResolver) {
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
    return new Promise<boolean>((resolve, reject) => {
      if (!this.outlet) {
        throw new Error("could not find any tab outlet!");
      }
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
        this.outlet.addView({
          title: data
            ? data["__dialogTitle"]
            : this.formTitleResolver.resolveTitle(
                undefined,
                primary.segments[0].path
              ),
          component: route.route.component,
          uniqueId: UUID.UUID(),
          data: {
            parameters: {
              routeByCustomProvider: true,
              path: primary.segments[0].path,
              ...route.route.data,
              ...data
            }
          },
          provides: [{ provide: ActivatedRoute, useValue: extras.relativeTo }]
        });
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}
