import {
  Directive,
  Input,
  Type,
  ComponentFactoryResolver,
  ViewContainerRef,
  EventEmitter,
  OnInit,
  OnDestroy,
  Injector,
  StaticProvider,
  ComponentFactory,
  NgModuleRef,
} from '@angular/core';
import { takeWhile } from 'rxjs/operators';

/**
 * NarikComponentLoaderDirective
 * Uses to load a component dynamically.
 */
@Directive({
  selector: '[narikComponentLoader]',
})
export class NarikComponentLoaderDirective implements OnInit, OnDestroy {
  isAlive = true;

  /**
   * Type of component.
   */
  @Input('narikComponentLoader')
  component: Type<any> | ComponentFactory<any>;

  // tslint:disable-next-line:no-input-rename

  /**
   * Parameters that should be sent to component.
   */
  @Input('narikComponentLoaderParameters')
  parameters: any;

  /**
   * Parameters that should be sent to component that should their changed be tracked.
   */
  @Input('narikComponentLoaderBindings')
  bindings: any;

  /**
   * Source of BindingChanges.
   */
  @Input('narikComponentLoaderBindingSource')
  bindingSource: any;

  @Input('narikComponentLoaderProviders')
  providers: StaticProvider[];

  // tslint:disable-next-line:no-input-rename

  /**
   * event that should be subscribed on component.
   */
  @Input('narikComponentLoaderEvents')
  events: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector
  ) {}

  ngOnInit() {
    const componentFactory =
      this.component instanceof ComponentFactory
        ? this.component
        : this.componentFactoryResolver.resolveComponentFactory(this.component);
    this.viewContainerRef.clear();

    let parentInjector = this.injector;
    if ((componentFactory as any).ngModule) {
      parentInjector = ((componentFactory as any).ngModule as NgModuleRef<any>)
        .injector;
    }

    const localInjector = Injector.create({
      parent: parentInjector,
      providers: this.providers || [],
    });

    const componentRef = this.viewContainerRef.createComponent(
      componentFactory,
      undefined,
      localInjector
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
          <EventEmitter<any>>this.bindingSource[key + 'Change']
        ) {
          (<EventEmitter<any>>this.bindingSource[key + 'Change'])
            .pipe(takeWhile((x) => this.isAlive))
            .subscribe((result) => {
              (<any>componentRef.instance)[key] = result;
            });
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
  ngOnDestroy(): void {
    this.bindingSource = undefined;
    this.bindings = undefined;
    this.parameters = undefined;
    this.isAlive = false;
  }
}
