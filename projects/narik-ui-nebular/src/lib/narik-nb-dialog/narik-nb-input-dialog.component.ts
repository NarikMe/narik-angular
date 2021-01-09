import { Component, OnInit, Inject } from '@angular/core';
import { DialogInputContent, PARAMETERS } from '@narik/infrastructure';

@Component({
    templateUrl: 'narik-nb-input-dialog.component.html',
})
export class NarikNebularInputDialog implements OnInit, DialogInputContent {
    entity: any = {};
    fields: any[] = [];
    constructor(@Inject(PARAMETERS) parameters: any) {
        if (parameters) {
            this.entity = parameters.entity;
            this.fields = parameters.fields;
        }
    }

    ngOnInit() {}
}
