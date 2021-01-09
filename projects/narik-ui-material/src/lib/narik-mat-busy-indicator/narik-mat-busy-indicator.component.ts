import { Component, forwardRef, Input, HostBinding } from '@angular/core';
import { BusyIndicator } from '@narik/app-core';

@Component({
    selector: 'narik-mat-busy-indicator , narik-busy-indicator',
    templateUrl: 'narik-mat-busy-indicator.component.html',
    styleUrls: ['narik-mat-busy-indicator.component.css'],
    providers: [
        {
            provide: BusyIndicator,
            useExisting: forwardRef(() => NarikMatBusyIndicator),
        },
    ],
})
export class NarikMatBusyIndicator implements BusyIndicator {
    busyMessage: string;

    @HostBinding('style.display') public display = 'block';
    @HostBinding('style.position') public position = 'relative';

    @HostBinding('style.min-height')
    @Input()
    public minHeight = '100px';

    @Input()
    isBusy: boolean;

    @Input()
    diameter = 70;

    setBusy(newState: boolean, msg?: string) {
        this.isBusy = newState;
    }
}
