import { NarikDynamicForm } from '@narik/ui-core';

import {
  Component,
  Injector,
  forwardRef,
  ViewContainerRef,
} from '@angular/core';
import { groupBy } from '@narik/common';
import { NarikViewField, EntityField } from '@narik/infrastructure';

@Component({
  selector: 'narik-dynamic-form , narik-ngb-dynamic-form',
  templateUrl: 'narik-ngb-dynamic-form.component.html',
  providers: [
    {
      provide: NarikDynamicForm,
      useExisting: forwardRef(() => NarikNgbDynamicForm),
    },
  ],
})
export class NarikNgbDynamicForm extends NarikDynamicForm {
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
        Math.max(...this.fieldsArray.entriesArray().map((x) => x.key)) + 1;
    }

    this.columnWidth = 100 / this.columnsCount;
  }
}
