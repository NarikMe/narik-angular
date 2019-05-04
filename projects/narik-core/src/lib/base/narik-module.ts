import {
  ModuleInfo,
  ModuleManager,
  ConfigService,
  JsonService
} from "narik-infrastructure";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { map, first } from "rxjs/operators";

import { Injector, NgModuleRef } from "@angular/core";

import { NarikHttpService } from "../services/narik-http.service";
import { NarikInject } from "../decorators/narik-inject.decorator";

export abstract class NarikModule  {
  abstract readonly key: string;
  abstract readonly moduleInfo: Observable<ModuleInfo>;

  @NarikInject(ModuleManager)
  private moduleManager: ModuleManager;

  @NarikInject(NgModuleRef)
  private moduleRef: NgModuleRef<any>;

  @NarikInject(NarikHttpService)
  private httpService: NarikHttpService;

  @NarikInject(JsonService)
  private jsonService: JsonService;

  @NarikInject(ConfigService)
  private configService: ConfigService;

  private moduleRootPath: string;

  constructor(private injector: Injector) {
    this.configService.configLoaded.pipe(first()).subscribe(() => {
      this.moduleRootPath = this.configService.getConfig("modulesMetaDataRoot");
      if (!this.moduleRootPath) {
        throw new Error("modulesMetaDataRoot is null");
      }
      this.registerModule();
    });
  }

  protected registerModule() {
    const moduleInfo = this.moduleInfo;
    if (moduleInfo) {
      moduleInfo.subscribe(info => {
        info.module = this.moduleRef;
        this.moduleManager.addOrUpdateModule(this.key, info);
      });
    }
  }

  protected loadInfoFromJson(): Observable<ModuleInfo> {
    return this.jsonService
      .getJson(`${this.moduleRootPath}/${this.key.toLowerCase()}.json`)
      .pipe(map(x => x as ModuleInfo));
  }

  protected loadInfoFromData(info: ModuleInfo): Observable<ModuleInfo> {
    return of(info);
  }
}
