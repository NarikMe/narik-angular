import {
  Directive,
  Input,
  Type,
  ComponentFactoryResolver,
  ViewContainerRef,
  EventEmitter,
  OnInit
} from "@angular/core";

/**
 * NarikComponentLoaderDirective
 * Uses to load a component dynamically.
 */
@Directive({
  selector: "[narikComponentLoader]"
})
export class NarikComponentLoaderDirective implements OnInit {
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

  /**
   * Parameters that should be sent to component that should their changed be tracked.
   */
  @Input("narikComponentLoaderBindings")
  bindings: any;

  /**
   * Source of BindingChanges.
   */
  @Input("narikComponentLoaderBindingSource")
  bindingSource: any;

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

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.component
    );
    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent(
      componentFactory
    );
    if (this.parameters) {
      for (const key of Object.keys(this.parameters)) {
        (<any>componentRef.instance)[key] = this.parameters[key];
      }
    }
    if (this.bindings) {
      for (const key of Object.keys(this.bindings)) {
        (<any>componentRef.instance)[key] = this.bindings[key];
        if (
          this.bindingSource &&
          <EventEmitter<any>>this.bindingSource[key + "Change"]
        ) {
          (<EventEmitter<any>>this.bindingSource[key + "Change"]).subscribe(
            result => {
              (<any>componentRef.instance)[key] = result;
            }
          );
        }
      }
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
