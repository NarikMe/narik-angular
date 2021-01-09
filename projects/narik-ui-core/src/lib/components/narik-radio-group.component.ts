import { NarikDataDisplayValueComponent } from '../base/narik-data-display-value-component';

export class NarikRadioGroup extends NarikDataDisplayValueComponent {
    protected useData(data: any[]) {
        throw new Error('Subclass Must Override useData.');
    }
}

export class NarikRadioItem {}
