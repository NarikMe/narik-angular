import { ViewContainerRef, Directive } from "@angular/core";

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: "[narik-loader-host]"
})
export class ComponentLoaderHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
