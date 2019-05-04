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
  CommandProcessor
} from "narik-infrastructure";

import { Type } from "@angular/core";

export interface NarikCoreModuleConfig {
  configFilePath?: string;
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
  commandProcessor?: Type<CommandProcessor>;
  defaultLang?: string;
  useDefaultLang?: boolean;
}
