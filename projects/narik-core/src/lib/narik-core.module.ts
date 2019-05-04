import { promiseSerial } from "narik-common";
import { NarikJsonService } from "./services/narik-json.service";
import { NarikConfigService } from "./services/narik-config.service";
import {
  AuthorizationService,
  DATA_PROVIDER,
  DATA_STORAGE,
  DataProviderService,
  DataStorageService,
  DEFAULT_LANG,
  DialogService,
  ErrorHandleService,
  EventAggregatorService,
  ModuleManager,
  NavigationProvider,
  NavigationService,
  RemoteDataProviderService,
  UrlCreator,
  UrlCreatorService,
  USE_DEFAULT_LANG,
  CONFIG_PATH,
  ConfigService,
  JsonService,
  CommandProcessor
} from "narik-infrastructure";
import { ToastrModule } from "ngx-toastr";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  Inject,
  Injector,
  ModuleWithProviders,
  NgModule,
  APP_INITIALIZER
} from "@angular/core";

import { COMPONENTS, EXPORT_COMPONENTS } from "./index";
import { NarikCoreModuleConfig } from "./interfaces/narik-core-module.config";
import { StaticDataProvider } from "./services/dataProviders/static-data-provider";
import { LocalStorageDataProvider } from "./services/dataProviders/local-storage-data-provider";
import { MemoryDataProvider } from "./services/dataProviders/memory-data-provider";
import { RemoteDataProvider } from "./services/dataProviders/remote-data-provider";
import { SessionStorageDataProvider } from "./services/dataProviders/session-storage-data-provider";
import { HttpErrorInterceptor } from "./services/errorHandlers/narik-http-error-handler";
import { NarikDataProviderService } from "./services/narik-data-provider.service";
import { NarikDataStorageService } from "./services/narik-data-storage.service";
import { NarikDialogNavigationProvider } from "./services/narik-dialog-navigation.provider";
import { NarikDialogService } from "./services/narik-dialog.service";
import { NarikErrorHandleService } from "./services/narik-error-handle.service";
import { NarikEventAggregatorService } from "./services/narik-event-aggregator.service";
import { NarikModuleManager } from "./services/narik-module-manager.service";
import { NarikNavigationService } from "./services/narik-navigation.service";
import { NarikRemoteDataProviderService } from "./services/narik-remote-data-provider.service";
import { NarikRoleBasedAuthorizationService } from "./services/narik-role-base-authorization.service";
import { NarikRouteNavigationProvider } from "./services/narik-route-navigation.provider";
import { NarikTranslateService } from "./services/narik-translation.service";
import { NarikUrlCreatorService } from "./services/narik-url-creator.service";
import { ApiUrlCreator } from "./services/urlCreator/api-url-creator";
import { ODataUrlCreator } from "./services/urlCreator/odata-url-creator";
import { NarikEmptyCommandProcessor } from "./services/narik-empty-command-processor.service";

@NgModule({
  imports: [ToastrModule.forRoot()],
  declarations: [COMPONENTS],
  exports: [EXPORT_COMPONENTS],
  providers: [
    {
      provide: RemoteDataProviderService,
      useClass: NarikRemoteDataProviderService
    },

    {
      provide: SessionStorageDataProvider,
      useClass: SessionStorageDataProvider
    },
    {
      provide: LocalStorageDataProvider,
      useClass: LocalStorageDataProvider
    },
    {
      provide: MemoryDataProvider,
      useClass: MemoryDataProvider
    },

    {
      provide: DATA_PROVIDER,
      useExisting: SessionStorageDataProvider,
      multi: true
    },
    {
      provide: DATA_PROVIDER,
      useClass: StaticDataProvider,
      multi: true
    },
    {
      provide: DATA_PROVIDER,
      useExisting: LocalStorageDataProvider,
      multi: true
    },
    {
      provide: DATA_PROVIDER,
      useExisting: MemoryDataProvider,
      multi: true
    },
    {
      provide: DATA_PROVIDER,
      useClass: RemoteDataProvider,
      multi: true
    },
    {
      provide: DATA_STORAGE,
      useExisting: SessionStorageDataProvider,
      multi: true
    },
    {
      provide: DATA_STORAGE,
      useExisting: LocalStorageDataProvider,
      multi: true
    },
    {
      provide: DATA_STORAGE,
      useExisting: MemoryDataProvider,
      multi: true
    },
    {
      provide: UrlCreator,
      useClass: ApiUrlCreator,
      multi: true
    },
    {
      provide: UrlCreator,
      useClass: ODataUrlCreator,
      multi: true
    },
    {
      provide: NavigationProvider,
      useClass: NarikDialogNavigationProvider,
      multi: true
    },
    {
      provide: NavigationProvider,
      useClass: NarikRouteNavigationProvider,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ]
})
export class NarikCoreModule {
  constructor(
    translateService: NarikTranslateService,
    @Inject(DEFAULT_LANG) defaultLang: string,
    @Inject(USE_DEFAULT_LANG) useDefaultLang: boolean,
    injector: Injector
  ) {
    translateService.setDefaultLang(defaultLang);
    if (useDefaultLang) {
      translateService.use(defaultLang);
    }
    window["$$$_root_injector"] = injector;
  }
  static forRoot(config?: NarikCoreModuleConfig): ModuleWithProviders {
    return {
      ngModule: NarikCoreModule,
      providers: [
        {
          provide: ErrorHandleService,
          useClass:
            (config && config.errorHandleService) || NarikErrorHandleService
        },
        {
          provide: DataProviderService,
          useClass:
            (config && config.dataProviderService) || NarikDataProviderService
        },
        {
          provide: DataStorageService,
          useClass:
            (config && config.dataStorageService) || NarikDataStorageService
        },
        {
          provide: DialogService,
          useClass: (config && config.dialogService) || NarikDialogService
        },
        {
          provide: UrlCreatorService,
          useClass:
            (config && config.urlCreatorService) || NarikUrlCreatorService
        },
        {
          provide: ModuleManager,
          useClass:
            (config && config.moduleManagerService) || NarikModuleManager
        },
        {
          provide: EventAggregatorService,
          useClass:
            (config && config.eventAggregatorService) ||
            NarikEventAggregatorService
        },
        {
          provide: AuthorizationService,
          useClass:
            (config && config.authorizationService) ||
            NarikRoleBasedAuthorizationService
        },
        {
          provide: ConfigService,
          useClass: (config && config.configService) || NarikConfigService
        },
        {
          provide: JsonService,
          useClass: (config && config.jsonService) || NarikJsonService
        },
        {
          provide: CommandProcessor,
          useClass: (config && config.commandProcessor) || NarikEmptyCommandProcessor
        },
        {
          provide: DEFAULT_LANG,
          useValue: (config && config.defaultLang) || "en"
        },
        {
          provide: NavigationService,
          useClass: NarikNavigationService
        },
        {
          provide: USE_DEFAULT_LANG,
          useValue: config && config.useDefaultLang
        },
        { provide: CONFIG_PATH, useValue: config && config.configFilePath },
        {
          provide: APP_INITIALIZER,
          useFactory: initConfig,
          deps: [ConfigService, ModuleManager],
          multi: true
        }
      ]
    };
  }
}
export function initConfig(
  configService: ConfigService,
  moduleManager: ModuleManager
): () => Promise<any> {
  const promise = (): Promise<any> => {
    // return configService.init().then(() => {
    //   moduleManager.init();
    // });

    return promiseSerial([
      () => configService.init(),
      () => moduleManager.init()
    ]);
  };
  return promise;
}