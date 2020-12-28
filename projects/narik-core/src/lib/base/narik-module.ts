import { Injector, NgModuleRef } from '@angular/core';
import {
  ConfigService,
  HttpService,
  JsonService,
  ModuleInfo,
  ModuleManager,
} from '@narik/infrastructure';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { NarikInject } from '../decorators/narik-inject.decorator';

export abstract class NarikModule {
  abstract readonly key: string;
  abstract readonly moduleInfo: Observable<ModuleInfo>;

  @NarikInject(ModuleManager)
  protected moduleManager: ModuleManager;

  @NarikInject(NgModuleRef)
  private moduleRef: NgModuleRef<any>;

  @NarikInject(HttpService)
  private httpService: HttpService;

  @NarikInject(JsonService)
  private jsonService: JsonService;

  @NarikInject(ConfigService)
  protected configService: ConfigService;

  private moduleRootPath: string;

  constructor(private injector: Injector) {
    this.configService.configLoaded.pipe(first()).subscribe(() => {
      this.moduleRootPath = this.configService.getConfig('modulesMetaDataRoot');
      if (!this.moduleRootPath) {
        throw new Error('modulesMetaDataRoot is null');
      }
      this.registerModule();
    });
  }

  protected registerModule() {
    const moduleInfo = this.moduleInfo;
    if (moduleInfo) {
      moduleInfo.subscribe((info) => {
        info.module = this.moduleRef;
        this.moduleManager.addOrUpdateModule(this.key, info);
      });
    }
  }

  protected loadInfoFromJson(): Observable<ModuleInfo> {
    return this.jsonService
      .getJson(`${this.moduleRootPath}/${this.key.toLowerCase()}.json`)
      .pipe(map((x) => x as ModuleInfo));
  }

  protected loadInfoFromData(info: ModuleInfo): Observable<ModuleInfo> {
    return of(info);
  }
}
