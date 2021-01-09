import { NarikDataTable } from '@narik/ui-core';

import { Component, Injector, ChangeDetectorRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'narik-nb-data-table , narik-data-table',
    templateUrl: 'narik-nb-data-table.component.html',
})
export class NarikNebularDataTable extends NarikDataTable {
    constructor(
        injector: Injector,
        private changeDetector: ChangeDetectorRef,
        @Inject(DOCUMENT) private document
    ) {
        super(injector);
    }
}
