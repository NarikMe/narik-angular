import { groupBy } from '@narik/common';
import { EntityField, NarikViewField } from '@narik/infrastructure';
import { NarikDynamicForm } from '@narik/ui-core';

import { Component, Injector, OnInit, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'narik-dynamic-form , narik-mat-dynamic-form',
    templateUrl: 'narik-mat-dynamic-form.component.html',
})
export class NarikMatDynamicForm extends NarikDynamicForm implements OnInit {
    columnWidth = 100;
    groupCount: number;
    fieldsArray = new Map<number, NarikViewField[] | EntityField[]>();

    constructor(injector: Injector, viewContainerRef: ViewContainerRef) {
        super(injector, viewContainerRef);
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.columnsCount === 1) {
            this.layoutGap = 0;
        }
        if (this.groupFields) {
            const data = groupBy(this.fields, 'options.groupIndex');
            data.forEach((x) =>
                this.fieldsArray.set(
                    x.key && x.key !== 'undefined' ? +x.key : 0,
                    x.value
                )
            );
            this.groupCount =
                Math.max(...this.fieldsArray.entriesArray().map((x) => x.key)) +
                1;
        }

        this.columnWidth = 100 / this.columnsCount;
    }
}
