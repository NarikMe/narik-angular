import { UUID } from 'angular2-uuid';
import { NarikToolBar } from '@narik/ui-core';
import { Component, Injector, ViewContainerRef, OnInit } from '@angular/core';

@Component({
    selector: 'narik-toolbar , narik-nb-toolbar',
    templateUrl: 'narik-nb-toolbar.component.html',
    styleUrls: ['narik-nb-toolbar.component.css'],
})
export class NarikNebularToolBar extends NarikToolBar implements OnInit {
    uniqueId = '';
    toolbarItems: any[] = [];

    constructor(injector: Injector, viewContainerRef: ViewContainerRef) {
        super(injector, viewContainerRef);
        this.uniqueId = 'toolbar' + UUID.UUID();
    }

    ngOnInit() {
        super.ngOnInit();
        let isnewGroup = false;
        let toolBarGroup = [];
        for (const item of this.items) {
            if (item.itemType === 'divider') {
                isnewGroup = true;
            }
            if (item.itemType !== 'divider') {
                toolBarGroup.push(item);
            }
            if (isnewGroup) {
                this.toolbarItems.push([...toolBarGroup]);
                toolBarGroup = [];
            }
            isnewGroup = false;
        }
        if (toolBarGroup.length !== 0) {
            this.toolbarItems.push(toolBarGroup);
        }
    }
}
