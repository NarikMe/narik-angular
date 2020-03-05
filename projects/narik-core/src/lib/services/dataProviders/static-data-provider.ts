import { DataInfo, ModuleManager } from "@narik/infrastructure";

import { Injectable, Injector } from "@angular/core";
import { NarikBaseDataProvider } from "../../base/narik-base-data-provider";
import { of } from "rxjs";
import { toDtoArray } from "@narik/common";
import { NarikTranslateService } from "../narik-translation.service";

@Injectable()
export class StaticDataProvider extends NarikBaseDataProvider {
  key = "static";
  order = 0;
  belongsInChain = false;

  private modulesStaticData = new Map<
    string,
    Map<
      string,
      {
        key: string;
        translateField?: string;
        ignoreTranslate?: boolean;
        convertToDto?: boolean;
        data: any[];
      }
    >
  >();

  constructor(
    injector: Injector,
    private moduleManager: ModuleManager,
    private translateor: NarikTranslateService
  ) {
    super(injector);

    for (const module of this.moduleManager.modules.entriesArray()) {
      if (module.value.metaData) {
        this.addStaticData(module.key, module.value.metaData["staticData"]);
      }
    }
    this.moduleManager.modulesChanged.subscribe(x => {
      if (x.moduleInfo.metaData) {
        this.addStaticData(x.moduleKey, x.moduleInfo.metaData["staticData"]);
      }
    });
  }

  private addStaticData(
    moduleKey: string,
    staticData: Map<
      string,
      { key: string; translateField?: string; data: any[] }
    >
  ) {
    if (staticData && !this.modulesStaticData.has(moduleKey)) {
      this.modulesStaticData.set(moduleKey, staticData);
    }
  }

  isDataProviderFor(dataInfo: DataInfo): boolean {
    return false;
  }

  getData(dataInfo: DataInfo) {
    const moduleData = this.modulesStaticData.get(dataInfo.moduleKey);
    if (moduleData) {
      const staticDataInfo = moduleData.get(dataInfo.dataKey);
      if (staticDataInfo && staticDataInfo.data) {
        const resultData =
          staticDataInfo.convertToDto === false
            ? staticDataInfo.data
            : toDtoArray(staticDataInfo.data);
        if (staticDataInfo.ignoreTranslate !== true) {
          const translateField = staticDataInfo.translateField || "title";
          for (const item of resultData) {
            item[translateField] = this.translateor.instant(item[translateField]);
          }
        }
        return of(resultData);
      }
    }
    return of([]);
  }
}
