import { NgModule, ModuleWithProviders, Inject } from "@angular/core";
import { ClientStorageDataProvider } from "./services/client-data-storage-provider";
import { DATA_PROVIDER, DATA_STORAGE } from "narik-infrastructure";
import { NgForageConfig, Driver, DriverType } from "ngforage";
import { ClientStorageOptions } from "./models/client-storage-options";
import {
  CLIENT_STORAGE_VALIDITY_LEN,
  CLIENT_STORAGE_DRIVER_TYPES,
  CLIENT_STORAGE_DB_NAME
} from "./injectionTokens";

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    {
      provide: ClientStorageDataProvider,
      useClass: ClientStorageDataProvider
    },
    {
      provide: DATA_PROVIDER,
      useExisting: ClientStorageDataProvider,
      multi: true
    },
    {
      provide: DATA_STORAGE,
      useExisting: ClientStorageDataProvider,
      multi: true
    }
  ]
})
export class NarikClientStorageModule {
  constructor(
    ngfConfig: NgForageConfig,
    @Inject(CLIENT_STORAGE_DB_NAME) dbName: string,
    @Inject(CLIENT_STORAGE_DRIVER_TYPES) driverTypes: DriverType[]
  ) {
    ngfConfig.configure({
      name: dbName,
      storeName: "data",
      driver: driverTypes
    });
  }

  static forRoot(config?: ClientStorageOptions): ModuleWithProviders<NarikClientStorageModule> {
    return {
      ngModule: NarikClientStorageModule,
      providers: [
        {
          provide: CLIENT_STORAGE_VALIDITY_LEN,
          useValue: config && config.validitylen ? config.validitylen : 0
        },
        {
          provide: CLIENT_STORAGE_DB_NAME,
          useValue:
            config && config.dbName ? config.dbName : "narikClientStorage"
        },
        {
          provide: CLIENT_STORAGE_DRIVER_TYPES,
          useValue:
            config && config.driverTypes
              ? config.driverTypes
              : [Driver.INDEXED_DB, Driver.WEB_SQL, Driver.LOCAL_STORAGE]
        }
      ]
    };
  }
}
