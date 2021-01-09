import { Component, OnInit } from '@angular/core';
import { NarikDialogContainer, DialogAnimationBody } from '@narik/core';
import { trigger } from '@angular/animations';

@Component({
    templateUrl: 'narik-ngx-dialog-container.component.html',
    styleUrls: ['narik-ngx-dialog-container.component.css'],
    animations: [trigger('openClose', DialogAnimationBody)],
})
export class NarikNgxDialogContainer
    extends NarikDialogContainer
    implements OnInit {
    ngOnInit() {}
}
