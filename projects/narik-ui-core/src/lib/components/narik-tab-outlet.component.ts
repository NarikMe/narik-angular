import { NarikInject } from '@narik/core';
import { NarikOutlet, FormTitleResolver } from '@narik/infrastructure';

import {
    Injector,
    Input,
    ComponentFactoryResolver,
    StaticProvider,
    OnInit,
    OnDestroy,
} from '@angular/core';
import {
    ChildrenOutletContexts,
    PRIMARY_OUTLET,
    ActivatedRoute,
} from '@angular/router';

import { NarikUiComponent } from '../base/narik-ui-component';
import { UUID } from 'angular2-uuid';

export abstract class NarikTabOutlet
    extends NarikUiComponent
    implements NarikOutlet, OnInit, OnDestroy {
    tabs = [];
    selectedIndex: number;

    @NarikInject(ChildrenOutletContexts)
    private parentContexts: ChildrenOutletContexts;

    @NarikInject(FormTitleResolver)
    private formTitleResolver: FormTitleResolver;

    @Input()
    name: string;

    constructor(injector: Injector) {
        super(injector);

        this.name = this.name || PRIMARY_OUTLET;
        this.parentContexts.onChildOutletCreated(this.name, this as any);
    }

    ngOnInit() {
        const context = this.parentContexts.getContext(this.name);
        if (context && context.route) {
            if (context.attachRef) {
            } else {
                // otherwise the component defined in the configuration is created
                this.activateWith(context.route, context.resolver || null);
            }
        }
    }
    removeTab(index: number) {
        this.tabs.splice(index, 1);
    }
    addView(tab: any) {
        this.tabs.push(tab);
        this.selectedIndex = this.tabs.length - 1;
    }

    trackByFn(index, item) {
        return item.uniqueId;
    }

    deactivate() {}

    activateWith(
        activatedRoute: ActivatedRoute,
        resolver: ComponentFactoryResolver | null
    ) {
        const snapshot = (activatedRoute as any)._futureSnapshot;
        const component = <any>snapshot.routeConfig!.component;

        const providers: StaticProvider[] = [];
        providers.push({ provide: ActivatedRoute, useValue: activatedRoute });

        this.addView({
            title: this.formTitleResolver.resolveTitle(activatedRoute.snapshot),
            component: component,
            providers: providers,
            uniqueId: UUID.UUID(),
        });
    }

    ngOnDestroy(): void {
        this.tabs = [];
        this.parentContexts.onChildOutletDestroyed(this.name);
    }
}
