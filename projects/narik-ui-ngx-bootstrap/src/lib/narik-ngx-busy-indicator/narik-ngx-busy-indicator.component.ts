import { Component, forwardRef, Input } from '@angular/core';
import { BusyIndicator } from '@narik/app-core';

@Component({
    selector: 'narik-ngx-busy-indicator , narik-busy-indicator',
    templateUrl: 'narik-ngx-busy-indicator.component.html',
    styleUrls: ['narik-ngx-busy-indicator.component.css'],
    providers: [
        {
            provide: BusyIndicator,
            useExisting: forwardRef(() => NarikNgxBusyIndicator),
        },
    ],
})
export class NarikNgxBusyIndicator implements BusyIndicator {
    busyMessage: string;

    @Input()
    isBusy: boolean;
    setBusy(newState: boolean, msg?: string) {
        this.isBusy = newState;
    }
}
