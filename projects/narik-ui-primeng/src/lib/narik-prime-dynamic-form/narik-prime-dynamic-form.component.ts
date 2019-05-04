import { NarikDynamicForm } from "narik-ui-core";

import {
  Component,
  Injector,
  forwardRef,
  ViewContainerRef
} from "@angular/core";

@Component({
  selector: "narik-dynamic-form , narik-prime-dynamic-form",
  templateUrl: "narik-prime-dynamic-form.component.html",
  providers: [
    {
      provide: NarikDynamicForm,
      useExisting: forwardRef(() => NarikPrimeDynamicForm)
    }
  ]
})
export class NarikPrimeDynamicForm extends NarikDynamicForm {
  constructor(injector: Injector, viewContainerRef: ViewContainerRef) {
    super(injector, viewContainerRef);
  }
}
