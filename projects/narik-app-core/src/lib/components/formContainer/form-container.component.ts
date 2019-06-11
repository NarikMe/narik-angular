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
  ViewChild
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComponentLoaderHostDirective } from "narik-common";

@Component({
  templateUrl: "form-container.component.html"
})
export class FormContainerComponent implements OnInit {
  @ViewChild(ComponentLoaderHostDirective, { static: true })
  loaderHost: ComponentLoaderHostDirective;

  parameters: any = {};
  constructor(
    private activateRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewManager: ViewManagerService,
    private metaDataManager: MetaDataService
  ) {}

  ngOnInit() {
    const moduleKey = !this.parameters.routeByDialogService
      ? this.activateRoute.snapshot.data.moduleKey
      : this.parameters.moduleKey;

    const viewKey = !this.parameters.routeByDialogService
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
    const factories = Array.from(
      this.componentFactoryResolver["_factories"].keys()
    );
    const factoryClass = <Type<any>>(
      factories.find(
        (x: any) =>
          x.name === viewInfo.component ||
          x["COMPONENT_NAME"] === viewInfo.component
      )
    );

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
}
