import { Component, forwardRef, Input } from '@angular/core';
import { BusyIndicator } from '@narik/app-core';

@Component({
    selector: 'narik-ngb-busy-indicator , narik-busy-indicator',
    templateUrl: 'narik-ngb-busy-indicator.component.html',
    styleUrls: ['narik-ngb-busy-indicator.component.css'],
    providers: [
        {
            provide: BusyIndicator,
            useExisting: forwardRef(() => NarikNgbBusyIndicator),
        },
    ],
})
export class NarikNgbBusyIndicator implements BusyIndicator {
    busyMessage: string;

    @Input()
    isBusy: boolean;
    setBusy(newState: boolean, msg?: string) {
        this.isBusy = newState;
    }
}
