import { Component, OnInit, Injector, ViewChild } from '@angular/core';

import { NarikTabOutlet } from '@narik/ui-core';

import { NbTabsetComponent } from '@nebular/theme';

@Component({
    selector: 'narik-nb-tab-outlet , narik-tab-outlet',
    templateUrl: 'narik-nb-tab-outlet.component.html',
    styleUrls: ['narik-nb-tab-outlet.component.css'],
})
export class NarikNebularTabOutlet extends NarikTabOutlet implements OnInit {
    @ViewChild('tabSet', { static: true })
    tabSet: NbTabsetComponent;

    constructor(injector: Injector) {
        super(injector);
    }

    removeTabItem(index) {
        this.removeTab(index);
        if (index === 0) {
            if (this.tabs.length > 0) {
                this.selectedIndex = 0;
            }
        } else {
            this.selectedIndex = index - 1;
        }
        return false;
    }

    changeTab(e) {
        this.selectedIndex = this.tabSet.tabs.toArray().indexOf(e);
    }
}
