import { Component, OnInit, Inject } from '@angular/core';
import { DialogInputContent, PARAMETERS } from '@narik/infrastructure';

@Component({
    templateUrl: 'narik-swimlane-input-dialog.component.html',
})
export class NarikSwimlaneInputDialog implements OnInit, DialogInputContent {
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
