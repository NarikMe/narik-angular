import { Component, Injector, forwardRef } from '@angular/core';
import { NarikUiEditForm } from '@narik/ui-lib';
import { HOST_TOKEN } from '@narik/infrastructure';

@Component({
    templateUrl: 'general-edit.component.html',
    providers: [
        {
            provide: HOST_TOKEN,
            useExisting: forwardRef(() => GeneralEditComponent),
        },
    ],
})
export class GeneralEditComponent extends NarikUiEditForm<any> {
    constructor(injector: Injector) {
        super(injector);
    }
}
