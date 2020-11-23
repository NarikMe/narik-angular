import { NarikDynamicForm } from '@narik/ui-core';

import {
  Component,
  Injector,
  forwardRef,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'narik-dynamic-form , narik-dev-dynamic-form',
  templateUrl: 'narik-dev-dynamic-form.component.html',
  providers: [
    {
      provide: NarikDynamicForm,
      useExisting: forwardRef(() => NarikDevDynamicForm),
    },
  ],
})
export class NarikDevDynamicForm extends NarikDynamicForm {
  constructor(injector: Injector, viewContainerRef: ViewContainerRef) {
    super(injector, viewContainerRef);
  }
}
