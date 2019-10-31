import {
  ViewManagerService,
  Entity,
  MetaDataService
} from "narik-infrastructure";

import {
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
  Type,
  ViewChild,
  NgModuleRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComponentLoaderHostDirective } from "narik-common";

@Component({
  templateUrl: "form-container.component.html"
})
export class FormContainerComponent implements OnInit {
  @ViewChild(ComponentLoaderHostDirective, { static: true })
  loaderHost: ComponentLoaderHostDirective;

  viewTypes: Map<string, Type<any>> = new Map<string, Type<any>>();

  parameters: any = {};
  constructor(
    private activateRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewManager: ViewManagerService,
    private metaDataManager: MetaDataService,
    private ngModule: NgModuleRef<any>
  ) {}

  ngOnInit() {
    const moduleKey = !this.parameters.routeByCustomProvider
      ? this.activateRoute.snapshot.data.moduleKey
      : this.parameters.moduleKey;

    const viewKey = !this.parameters.routeByCustomProvider
      ? this.activateRoute.snapshot.url[0].path
      : this.parameters.path;
    const viewInfo = this.viewManager.getViewInfo(moduleKey, viewKey);
    if (!viewInfo) {
      throw new Error(
        `view info not found! view:${viewKey}  module:${moduleKey} `
      );
    }

    let entityInfo: Entity = {
      key: viewInfo.entity
    };

    if (entityInfo.key) {
      entityInfo = this.metaDataManager.getEntityInformation(
        moduleKey,
        entityInfo.key
      );
    }

    let factories: any[];
    let factoryClass: Type<any>;
    if (this.componentFactoryResolver["_factories"]) {
      factories = Array.from(
        this.componentFactoryResolver["_factories"].keys()
      );
      factoryClass = <Type<any>>(
        factories.find(
          (x: any) =>
            x.name === viewInfo.component ||
            x["COMPONENT_NAME"] === viewInfo.component
        )
      );
    } else {
      factoryClass = this.findView(viewInfo.component);
    }

    if (!factoryClass) {
      throw new Error(`colud not find entry for "${viewInfo.component}"`);
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      factoryClass
    );
    const viewContainerRef = this.loaderHost.viewContainerRef;
    viewContainerRef.clear();

    const cmp = viewContainerRef.createComponent(componentFactory);

    if (viewInfo) {
      viewInfo.options = viewInfo.options || {};
    }
    cmp.instance.parameters = {
      ...this.parameters,
      config: {
        entityKey: viewInfo.entity,
        isDynamic: true,
        ...entityInfo,
        ...viewInfo
      }
    };
  }

  private findView(viewName: string): Type<any> {
    const founded = this.viewTypes.get(viewName);
    if (founded) {
      return founded;
    }
    const fff = Array.from((this.ngModule as any)._r3Injector.injectorDefTypes);
    for (const i of fff) {
      // tslint:disable-next-line:no-string-literal
      if (i["ɵmod"] && Array.isArray(i["ɵmod"].declarations)) {
        // tslint:disable-next-line:no-string-literal
        const t = i["ɵmod"].declarations.find(
          (x: any) =>
            x.name === viewName ||
            // tslint:disable-next-line:no-string-literal
            x["COMPONENT_NAME"] === viewName
        );
        if (t) {
          this.viewTypes.set(viewName, t);
          return t;
        }
      }
    }
  }
}
