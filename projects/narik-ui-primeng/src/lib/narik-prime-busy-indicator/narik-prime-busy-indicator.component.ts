import { Component, forwardRef, Input } from '@angular/core';
import { BusyIndicator } from '@narik/app-core';

@Component({
    selector: 'narik-prime-busy-indicator , narik-busy-indicator',
    templateUrl: 'narik-prime-busy-indicator.component.html',
    styleUrls: ['narik-prime-busy-indicator.component.css'],
    providers: [
        {
            provide: BusyIndicator,
            useExisting: forwardRef(() => NarikPrimeBusyIndicator),
        },
    ],
})
export class NarikPrimeBusyIndicator implements BusyIndicator {
    busyMessage: string;

    @Input()
    strokeWidth: 5;

    @Input()
    width: 80;

    @Input()
    height: 80;

    @Input()
    isBusy: boolean;
    setBusy(newState: boolean, msg?: string) {
        this.isBusy = newState;
    }
}
