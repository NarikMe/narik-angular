import {
    Router,
    Route,
    UrlSegment,
    UrlSegmentGroup,
    UrlMatchResult,
} from '@angular/router';
import { Type } from '@angular/core';
import { NarikOutlet } from '@narik/infrastructure';

export class NarikBaseNavigationProvider {
    outlet: NarikOutlet;

    constructor(protected router: Router) {}

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
            if (route.path === '**') {
                return {
                    route: route,
                };
            } else {
                if (route.path === '') {
                    if (
                        route.pathMatch === 'full' &&
                        (segmentGroup.hasChildren() || segments.length > 0)
                    ) {
                        throw new Error('');
                    }

                    item = {
                        component: null,
                        match: { consumed: [], posParams: {} },
                    };
                } else {
                    item = {
                        component: null,
                        match: this.defaultUrlMatcher(
                            segments,
                            segmentGroup,
                            route
                        ),
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
            return route['_loadedConfig'].routes;
        }

        return [];
    }

    defaultUrlMatcher(
        segments: UrlSegment[],
        segmentGroup: UrlSegmentGroup,
        route: Route
    ): UrlMatchResult | null {
        const parts = route.path.split('/');

        if (parts.length > segments.length) {
            // The actual URL is shorter than the config, no match
            return null;
        }

        if (
            route.pathMatch === 'full' &&
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
            const isParameter = part.startsWith(':');
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
