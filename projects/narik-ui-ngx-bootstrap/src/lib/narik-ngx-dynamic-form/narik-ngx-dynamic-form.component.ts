import { NarikDynamicForm } from "narik-ui-core";

import {
  Component,
  Injector,
  forwardRef,
  ViewContainerRef
} from "@angular/core";

@Component({
  selector: "narik-dynamic-form , narik-ngx-dynamic-form",
  templateUrl: "narik-ngx-dynamic-form.component.html",
  providers: [
    {
      provide: NarikDynamicForm,
      useExisting: forwardRef(() => NarikNgxDynamicForm)
    }
  ]
})
export class NarikNgxDynamicForm extends NarikDynamicForm {
  constructor(injector: Injector, viewContainerRef: ViewContainerRef) {
    super(injector, viewContainerRef);
  }
}
