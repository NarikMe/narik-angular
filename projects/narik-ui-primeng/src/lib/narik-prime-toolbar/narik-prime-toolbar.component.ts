import { UUID } from 'angular2-uuid';
import { NarikToolBar } from '@narik/ui-core';
import {
    Component,
    Injector,
    ViewContainerRef,
    OnInit,
    Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'narik-toolbar , narik-prime-toolbar',
    templateUrl: 'narik-prime-toolbar.component.html',
})
export class NarikPrimeToolBar extends NarikToolBar implements OnInit {
    uniqueId = '';
    isRtl = false;
    toolbarItems: any[];
    constructor(
        injector: Injector,
        viewContainerRef: ViewContainerRef,
        @Inject(DOCUMENT) private document
    ) {
        super(injector, viewContainerRef);
        this.uniqueId = 'toolbar' + UUID.UUID();
        this.isRtl = this.document.dir === 'rtl';
    }
}
