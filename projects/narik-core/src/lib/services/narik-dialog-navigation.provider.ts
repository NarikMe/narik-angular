import {
  DialogOption,
  DialogRef,
  DialogService,
  NavigationProvider
} from "narik-infrastructure";

import { Inject, Injectable, Type } from "@angular/core";
import {
  NavigationExtras,
  PRIMARY_OUTLET,
  Route,
  Router,
  UrlMatchResult,
  UrlSegment,
  UrlSegmentGroup,
  ActivatedRoute
} from "@angular/router";

@Injectable()
export class NarikDialogNavigationProvider implements NavigationProvider {
  key = "dialog";

  constructor(private dialogService: DialogService, private router: Router) {}
  navigate(
    commands: any[],
    extras?: NavigationExtras,
    data?: any,
    dialogOptions?: DialogOption
  ): Promise<boolean | DialogRef<any>> {
    return new Promise<DialogRef<any>>((resolve, reject) => {
      const tree = this.router.createUrlTree(commands as any[], extras);
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
              routeByDialogService: true,
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

  findRoute(
    config: Route[],
    segments: UrlSegment[],
    segmentGroup: UrlSegmentGroup
  ): {
    match?: UrlMatchResult;
    route?: Route;
  } {
    let item: {
      match?: UrlMatchResult;
      component?: Type<any>;
    };
    for (const route of config) {
      if (route.path === "**") {
        return {
          route: route
        };
      } else {
        if (route.path === "") {
          if (
            route.pathMatch === "full" &&
            (segmentGroup.hasChildren() || segments.length > 0)
          ) {
            throw new Error("");
          }

          item = {
            component: null,
            match: { consumed: [], posParams: {} }
          };
        } else {
          item = {
            component: null,
            match: this.defaultUrlMatcher(segments, segmentGroup, route)
          };
        }

        if (item && item.match && item.match.consumed) {
          const childRoutes = this.getChildConfig(route);
          if (item.match.consumed.length !== 0) {
            segments.splice(0, 1);
          }

          item = this.findRoute(childRoutes, segments, segmentGroup);
          if (item) {
            return item;
          }
        }
      }
    }
    return item;
  }
  getChildConfig(route: Route): Route[] {
    if (route.children) {
      return route.children;
    }

    if (route.loadChildren) {
      return route["_loadedConfig"].routes;
    }

    return [];
  }

  defaultUrlMatcher(
    segments: UrlSegment[],
    segmentGroup: UrlSegmentGroup,
    route: Route
  ): UrlMatchResult | null {
    const parts = route.path.split("/");

    if (parts.length > segments.length) {
      // The actual URL is shorter than the config, no match
      return null;
    }

    if (
      route.pathMatch === "full" &&
      (segmentGroup.hasChildren() || parts.length < segments.length)
    ) {
      // The config is longer than the actual URL but we are looking for a full match, return null
      return null;
    }

    const posParams: { [key: string]: UrlSegment } = {};

    // Check each config part against the actual URL
    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];
      const segment = segments[index];
      const isParameter = part.startsWith(":");
      if (isParameter) {
        posParams[part.substring(1)] = segment;
      } else if (part !== segment.path) {
        // The actual URL part does not match the config, no match
        return null;
      }
    }

    return { consumed: segments.slice(0, parts.length), posParams };
  }
}
