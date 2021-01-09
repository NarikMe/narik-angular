import { Component, OnInit, Inject } from '@angular/core';
import { PARAMETERS } from '@narik/infrastructure';

@Component({
    templateUrl: 'narik-mat-message-dialog.component.html',
    styleUrls: ['narik-mat-message-dialog.component.css'],
})
export class NarikMatMessageDialog implements OnInit {
    message: string;
    constructor(@Inject(PARAMETERS) parameters: any) {
        if (parameters) {
            this.message = parameters.message;
        }
    }

    ngOnInit() {}
}
