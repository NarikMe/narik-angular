import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
    APP_INITIALIZER,
    Inject,
    Injector,
    ModuleWithProviders,
    NgModule,
} from '@angular/core';
import {
    AuthorizationService,
    CommandProcessor,
    ComponentTypeResolver,
    ConfigService,
    CONFIG_OPTIONS,
    CONFIG_PATH,
    DataProviderService,
    DataStorageService,
    DATA_PROVIDER,
    DATA_STORAGE,
    DEFAULT_LANG,
    DialogService,
    ErrorHandleService,
    EventAggregatorService,
    FormTitleResolver,
    HttpService,
    JsonService,
    ModuleManager,
    NavigationProvider,
    NavigationService,
    RemoteDataProviderService,
    ShortcutService,
    UrlCreator,
    UrlCreatorService,
    USE_DEFAULT_LANG,
    ValidationService,
} from '@narik/infrastructure';
import { promiseSerial } from '@narik/common';
import { ToastrModule } from 'ngx-toastr';
import { COMPONENTS, EXPORT_COMPONENTS } from './index';
import { TOASTR_OPTION } from './injectionTokens';
import { NarikCoreModuleConfig } from './interfaces/narik-core-module.config';
import { LocalStorageDataProvider } from './services/dataProviders/local-storage-data-provider';
import { MemoryDataProvider } from './services/dataProviders/memory-data-provider';
import { RemoteDataProvider } from './services/dataProviders/remote-data-provider';
import { SessionStorageDataProvider } from './services/dataProviders/session-storage-data-provider';
import { StaticDataProvider } from './services/dataProviders/static-data-provider';
import { HttpErrorInterceptor } from './services/errorHandlers/narik-http-error-handler';
import { NarikComponentTypeResolver } from './services/narik-component-type-resolver.service';
import { NarikConfigService } from './services/narik-config.service';
import { NarikDataProviderService } from './services/narik-data-provider.service';
import { NarikDataStorageService } from './services/narik-data-storage.service';
import { NarikDialogService } from './services/narik-dialog.service';
import { NarikEmptyCommandProcessor } from './services/narik-empty-command-processor.service';
import { NarikErrorHandleService } from './services/narik-error-handle.service';
import { NarikEventAggregatorService } from './services/narik-event-aggregator.service';
import { NarikFormTitleResolver } from './services/narik-form-title-resolver.service';
import { NarikHttpService } from './services/narik-http.service';
import { NarikJsonService } from './services/narik-json.service';
import { NarikModuleManager } from './services/narik-module-manager.service';
import { NarikNavigationService } from './services/narik-navigation.service';
import { NarikRemoteDataProviderService } from './services/narik-remote-data-provider.service';
import { NarikRoleBasedAuthorizationService } from './services/narik-role-base-authorization.service';
import { NarikShortcutService } from './services/narik-shortcut.service';
import { NarikTranslateService } from './services/narik-translation.service';
import { NarikUrlCreatorService } from './services/narik-url-creator.service';
import { NarikValidationService } from './services/narik-validation.service';
import { NarikDialogNavigationProvider } from './services/navigationProviders/narik-dialog-navigation.provider';
import { NarikRouteNavigationProvider } from './services/navigationProviders/narik-route-navigation.provider';
import { ApiUrlCreator } from './services/urlCreator/api-url-creator';
import { ODataUrlCreator } from './services/urlCreator/odata-url-creator';
import { AppInjector } from './util/app-injector';

@NgModule({
    imports: [ToastrModule.forRoot()],
    declarations: [COMPONENTS],
    exports: [EXPORT_COMPONENTS],
    providers: [
        {
            provide: RemoteDataProviderService,
            useClass: NarikRemoteDataProviderService,
        },
        {
            provide: HttpService,
            useClass: NarikHttpService,
        },
        {
            provide: SessionStorageDataProvider,
            useClass: SessionStorageDataProvider,
        },
        {
            provide: LocalStorageDataProvider,
            useClass: LocalStorageDataProvider,
        },
        {
            provide: MemoryDataProvider,
            useClass: MemoryDataProvider,
        },

        {
            provide: DATA_PROVIDER,
            useExisting: SessionStorageDataProvider,
            multi: true,
        },
        {
            provide: DATA_PROVIDER,
            useClass: StaticDataProvider,
            multi: true,
        },
        {
            provide: DATA_PROVIDER,
            useExisting: LocalStorageDataProvider,
            multi: true,
        },
        {
            provide: DATA_PROVIDER,
            useExisting: MemoryDataProvider,
            multi: true,
        },
        {
            provide: DATA_PROVIDER,
            useClass: RemoteDataProvider,
            multi: true,
        },
        {
            provide: DATA_STORAGE,
            useExisting: SessionStorageDataProvider,
            multi: true,
        },
        {
            provide: DATA_STORAGE,
            useExisting: LocalStorageDataProvider,
            multi: true,
        },
        {
            provide: DATA_STORAGE,
            useExisting: MemoryDataProvider,
            multi: true,
        },
        {
            provide: UrlCreator,
            useClass: ApiUrlCreator,
            multi: true,
        },
        {
            provide: UrlCreator,
            useClass: ODataUrlCreator,
            multi: true,
        },
        {
            provide: NavigationProvider,
            useClass: NarikDialogNavigationProvider,
            multi: true,
        },
        {
            provide: NavigationProvider,
            useClass: NarikRouteNavigationProvider,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },
    ],
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
        AppInjector.injector = injector;
    }
    static forRoot(
        config?: NarikCoreModuleConfig
    ): ModuleWithProviders<NarikCoreModule> {
        return {
            ngModule: NarikCoreModule,
            providers: [
                {
                    provide: ErrorHandleService,
                    useClass:
                        config?.errorHandleService || NarikErrorHandleService,
                },
                {
                    provide: DataProviderService,
                    useClass:
                        config?.dataProviderService || NarikDataProviderService,
                },
                {
                    provide: DataStorageService,
                    useClass:
                        config?.dataStorageService || NarikDataStorageService,
                },
                {
                    provide: DialogService,
                    useClass: config?.dialogService || NarikDialogService,
                },
                {
                    provide: UrlCreatorService,
                    useClass:
                        config?.urlCreatorService || NarikUrlCreatorService,
                },
                {
                    provide: ModuleManager,
                    useClass:
                        config?.moduleManagerService || NarikModuleManager,
                },
                {
                    provide: ValidationService,
                    useClass:
                        config?.validationService || NarikValidationService,
                },
                {
                    provide: EventAggregatorService,
                    useClass:
                        config?.eventAggregatorService ||
                        NarikEventAggregatorService,
                },
                {
                    provide: AuthorizationService,
                    useClass:
                        config?.authorizationService ||
                        NarikRoleBasedAuthorizationService,
                },
                {
                    provide: ConfigService,
                    useClass: config?.configService || NarikConfigService,
                },
                {
                    provide: JsonService,
                    useClass: config?.jsonService || NarikJsonService,
                },
                {
                    provide: ComponentTypeResolver,
                    useClass:
                        config?.componentTypeResolver ||
                        NarikComponentTypeResolver,
                },
                {
                    provide: FormTitleResolver,
                    useClass:
                        config?.formTitleResolver || NarikFormTitleResolver,
                },
                {
                    provide: CommandProcessor,
                    useClass:
                        config?.commandProcessor || NarikEmptyCommandProcessor,
                },
                {
                    provide: DEFAULT_LANG,
                    useValue: config?.defaultLang || 'en',
                },
                {
                    provide: NavigationService,
                    useClass: NarikNavigationService,
                },
                {
                    provide: USE_DEFAULT_LANG,
                    useValue: config?.isNativeApp,
                },
                {
                    provide: CONFIG_PATH,
                    useValue: config && config.configFilePath,
                },
                {
                    provide: CONFIG_OPTIONS,
                    useValue: config && config.configOptions,
                },
                config?.isNativeApp
                    ? []
                    : {
                          provide: APP_INITIALIZER,
                          useFactory: initNarik,
                          deps: [ConfigService, ModuleManager],
                          multi: true,
                      },
                {
                    provide: ShortcutService,
                    useClass: NarikShortcutService,
                },
                {
                    provide: TOASTR_OPTION,
                    useValue: config?.toastrOption,
                },
            ],
        };
    }
}
export function initNarik(
    configService: ConfigService,
    moduleManager: ModuleManager
): () => Promise<any> {
    const promise = (): Promise<any> => {
        return promiseSerial([
            () => configService.init(),
            () => moduleManager.init(),
        ]);
    };
    return promise;
}
