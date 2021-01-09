import { Component, OnInit, Inject } from '@angular/core';
import { PARAMETERS } from '@narik/infrastructure';

@Component({
    templateUrl: 'narik-swimlane-message-dialog.component.html',
    styleUrls: ['narik-swimlane-message-dialog.component.css'],
})
export class NarikSwimlaneMessageDialog implements OnInit {
    message: string;
    constructor(@Inject(PARAMETERS) parameters: any) {
        if (parameters) {
            this.message = parameters.message;
        }
    }

    ngOnInit() {}
}
