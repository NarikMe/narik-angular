import { NarikInject } from '@narik/core';
import {
    MetaDataService,
    ViewManagerService,
    View,
} from '@narik/infrastructure';

import { Injectable, Injector } from '@angular/core';
import { ViewComponentNameResolver } from '../interfaces/view-component-name-resolver';

@Injectable()
export class NarikViewManager implements ViewManagerService {
    @NarikInject(MetaDataService)
    metaDataService: MetaDataService;

    @NarikInject(ViewComponentNameResolver)
    viewComponentNameResolver: ViewComponentNameResolver;

    constructor(private injector: Injector) {}

    getViewInfo(moduleKey: string, viewKey: string): View {
        const view = this.metaDataService.getViewInformation(
            moduleKey,
            viewKey
        );
        this.completeViewInfo(view, moduleKey);
        return view;
    }

    private completeViewInfo(view: View, moduleKey: string) {
        if (view) {
            view.title = view.title || view.key;
            view.component = this.viewComponentNameResolver.resolveComponentName(
                view
            );
            view.fields =
                view.fields ||
                this.metaDataService.getEntityInformation(
                    moduleKey,
                    view.entity
                ).fields;
            if (view.excludedFields && view.fields) {
                view.fields = view.fields.filter(
                    (f) => view.excludedFields.indexOf(f.name) < 0
                );
            }
        }
    }
}
