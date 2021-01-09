import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { NarikDialogContainer, DialogAnimationBody } from '@narik/core';

@Component({
    templateUrl: 'narik-mat-dialog-container.component.html',
    styleUrls: ['narik-mat-dialog-container.component.css'],
    animations: [trigger('openClose', DialogAnimationBody)],
})
export class NarikMatDialogContainer
    extends NarikDialogContainer
    implements OnInit {
    ngOnInit() {}
}
