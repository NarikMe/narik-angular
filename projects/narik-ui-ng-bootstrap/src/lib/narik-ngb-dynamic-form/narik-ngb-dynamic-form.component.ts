import { NarikDynamicForm } from "narik-ui-core";

import {
  Component,
  Injector,
  forwardRef,
  ViewContainerRef
} from "@angular/core";

@Component({
  selector: "narik-dynamic-form , narik-ngb-dynamic-form",
  templateUrl: "narik-ngb-dynamic-form.component.html",
  providers: [
    {
      provide: NarikDynamicForm,
      useExisting: forwardRef(() => NarikNgbDynamicForm)
    }
  ]
})
export class NarikNgbDynamicForm extends NarikDynamicForm {
  constructor(injector: Injector, viewContainerRef: ViewContainerRef) {
    super(injector, viewContainerRef);
  }
}
