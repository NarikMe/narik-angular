import { NarikUiListForm } from '@narik/ui-swimlane';
import { Component, forwardRef, Injector } from '@angular/core';
import { HOST_TOKEN } from '@narik/infrastructure';
@Component({
    templateUrl: 'general-list.component.html',
    providers: [
        {
            provide: HOST_TOKEN,
            useExisting: forwardRef(() => GeneralListComponent),
        },
    ],
})
export class GeneralListComponent extends NarikUiListForm<any> {
    constructor(injector: Injector) {
        super(injector);
    }
}
