import {
  Directive,
  Input,
  Type,
  ComponentFactoryResolver,
  ViewContainerRef,
  EventEmitter,
  AfterViewInit
} from "@angular/core";

/**
 * NarikComponentLoaderDirective
 * Uses to load a component dynamically.
 */
@Directive({
  selector: "[narikComponentLoader]"
})
export class NarikComponentLoaderDirective implements AfterViewInit {
  /**
   * Type of component.
   */
  @Input("narikComponentLoader")
  component: Type<any>;

  // tslint:disable-next-line:no-input-rename

  /**
   * Parameters that should be sent to component.
   */
  @Input("narikComponentLoaderParameters")
  parameters: any;

  // tslint:disable-next-line:no-input-rename

  /**
   * event that should be subscribed on component.
   */
  @Input("narikComponentLoaderEvents")
  events: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngAfterViewInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.component
    );
    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent(
      componentFactory
    );
    if (this.parameters) {
      setTimeout(() => {
        for (const key of Object.keys(this.parameters)) {
          (<any>componentRef.instance)[key] = this.parameters[key];
        }
      });
    }
    if (this.events) {
      for (const key of Object.keys(this.events)) {
        if (componentRef.instance[key]) {
          (<EventEmitter<any>>componentRef.instance[key]).subscribe(
            this.events[key]
          );
        }
      }
    }
  }
}
