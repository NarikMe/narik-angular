import { UUID } from 'angular2-uuid';
import { NarikToolBar } from '@narik/ui-core';
import { Component, Injector, ViewContainerRef, OnInit } from '@angular/core';

@Component({
    selector: 'narik-toolbar , narik-dev-toolbar',
    templateUrl: 'narik-dev-toolbar.component.html',
})
export class NarikDevToolBar extends NarikToolBar implements OnInit {
    uniqueId = '';
    toolbarItems: any[];
    constructor(injector: Injector, viewContainerRef: ViewContainerRef) {
        super(injector, viewContainerRef);
        this.uniqueId = 'toolbar' + UUID.UUID();
    }
}
