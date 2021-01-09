import {
    ViewManagerService,
    Entity,
    MetaDataService,
    ComponentTypeResolver,
    PARAMETERS,
} from '@narik/infrastructure';

import {
    Component,
    ComponentFactoryResolver,
    Inject,
    OnInit,
    Type,
    ViewChild,
    NgModuleRef,
    Injector,
    Optional,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentLoaderHostDirective, isArray, isObject } from '@narik/common';

@Component({
    templateUrl: 'form-container.component.html',
})
export class FormContainerComponent implements OnInit {
    @ViewChild(ComponentLoaderHostDirective, { static: true })
    loaderHost: ComponentLoaderHostDirective;

    viewTypes: Map<string, Type<any>> = new Map<string, Type<any>>();

    objects: any[] = [];

    constructor(
        private activateRoute: ActivatedRoute,
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver,
        private componentTypeResolver: ComponentTypeResolver,
        private viewManager: ViewManagerService,
        private metaDataManager: MetaDataService,
        @Optional() @Inject(PARAMETERS) private parameters: any
    ) {}

    ngOnInit() {
        const moduleKey =
            !this.parameters || !this.parameters.routeByCustomProvider
                ? this.activateRoute.snapshot.data.moduleKey
                : this.parameters.moduleKey;

        const viewKey =
            !this.parameters || !this.parameters.routeByCustomProvider
                ? this.activateRoute.snapshot.url[0].path
                : this.parameters.path;

        const viewInfo = this.viewManager.getViewInfo(moduleKey, viewKey);
        if (!viewInfo) {
            throw new Error(
                `view info not found! view:${viewKey}  module:${moduleKey} `
            );
        }

        let entityInfo: Entity = {
            key: viewInfo.entity,
        };

        if (entityInfo.key) {
            entityInfo = this.metaDataManager.getEntityInformation(
                moduleKey,
                entityInfo.key
            );
        }

        const factoryClass = this.componentTypeResolver.resolveComponentType(
            viewInfo.component
        );

        if (!factoryClass) {
            throw new Error(`colud not find type for "${viewInfo.component}"`);
        }
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            factoryClass
        );
        const viewContainerRef = this.loaderHost.viewContainerRef;
        viewContainerRef.clear();

        const data = {
            ...(this.parameters || {}),
            config: {
                entityKey: viewInfo.entity,
                isDynamic: true,
                ...entityInfo,
                ...viewInfo,
            },
        };
        const localInjector = Injector.create({
            providers: [{ provide: PARAMETERS, useValue: data }],
            parent: this.injector,
        });

        const cmp = viewContainerRef.createComponent(
            componentFactory,
            undefined,
            localInjector
        );

        if (viewInfo) {
            viewInfo.options = viewInfo.options || {};
        }
    }
}
