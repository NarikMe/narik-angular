import {
    AuthorizationService,
    DataProviderService,
    DataStorageService,
    DialogService,
    ErrorHandleService,
    EventAggregatorService,
    ModuleManager,
    UrlCreatorService,
    ConfigService,
    JsonService,
    CommandProcessor,
    ValidationService,
    FormTitleResolver,
    ComponentTypeResolver,
} from '@narik/infrastructure';

import { Type } from '@angular/core';
import { ConfigOptions } from '@narik/infrastructure';
import { GlobalConfig } from 'ngx-toastr';

export interface NarikCoreModuleConfig {
    configFilePath?: string;
    configOptions?: ConfigOptions;
    errorHandleService?: Type<ErrorHandleService>;
    dataProviderService?: Type<DataProviderService>;
    dialogService?: Type<DialogService>;
    dataStorageService?: Type<DataStorageService>;
    moduleManagerService?: Type<ModuleManager>;
    eventAggregatorService?: Type<EventAggregatorService>;
    urlCreatorService?: Type<UrlCreatorService>;
    authorizationService?: Type<AuthorizationService>;
    configService?: Type<ConfigService>;
    jsonService?: Type<JsonService>;
    formTitleResolver?: Type<FormTitleResolver>;
    commandProcessor?: Type<CommandProcessor>;
    validationService?: Type<ValidationService>;
    componentTypeResolver?: Type<ComponentTypeResolver>;
    defaultLang?: string;
    useDefaultLang?: boolean;
    toastrOption?: Partial<GlobalConfig>;
    isNativeApp?: boolean;
}
