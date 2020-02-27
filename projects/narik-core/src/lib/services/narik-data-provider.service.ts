import {
  DataInfo,
  DataProvider,
  DataProviderService,
  DATA_PROVIDER,
  isDataStorage,
  ModuleManager,
  MODULE_DATA_KEY,
  EventAggregatorService,
  DataOption,
  RemoteMessagingService,
  MetaData
} from "@narik/infrastructure";
import { Observable } from "rxjs/internal/Observable";
import { Inject, Injectable, Injector, Optional } from "@angular/core";
import { mergeMap, first, tap, merge } from "rxjs/operators";
import { of } from "rxjs/internal/observable/of";
import { empty } from "rxjs";

@Injectable()
export class NarikDataProviderService extends DataProviderService {
  private dataProviders = new Map<string, DataProvider>();
  private modulesDataItems = new Map<string, Map<string, DataInfo>>();
  private modulesDafaultProviderKey = new Map<string, string>();
  private modulesDafaultOriginProviderKey = new Map<string, string>();

  constructor(
    @Inject(DATA_PROVIDER) providers: DataProvider[],
    private moduleManager: ModuleManager,
    private injector: Injector,
    private eventAggregatorService: EventAggregatorService,
    @Optional() private remoteMessagingService: RemoteMessagingService
  ) {
    super();
    providers.forEach(x => this.dataProviders.set(x.key, x));
    this.moduleManager.narikLoaded.subscribe(() => {
      this.eventAggregatorService
        .listen<DataInfo | DataInfo[]>("CLIENT_DATA_CHANGED")
        .pipe(
          merge(
            remoteMessagingService
              ? this.remoteMessagingService.listen("DATA-CHANGE")
              : empty()
          )
        )
        .subscribe((dataInfo: DataInfo) => {
          for (const provider of this.dataProviders.valuesArray()) {
            if (!isDataStorage(provider)) {
              provider.dataChanged(dataInfo);
            }
          }
        });
    });

    for (const module of this.moduleManager.modules.entriesArray()) {
      if (module.value.metaData) {
        this.addDataItems(module.key, module.value.metaData);
      }
    }
    this.moduleManager.modulesChanged.subscribe(x => {
      if (x.moduleInfo.metaData) {
        this.addDataItems(x.moduleKey, x.moduleInfo.metaData);
      }
    });
  }

  private addDataItems(moduleKey: string, metaData: MetaData) {
    if (metaData.dataInfo) {
      const dataInfo = metaData.dataInfo;
      if (dataInfo.defaultDataProvider) {
        this.modulesDafaultProviderKey.set(
          moduleKey,
          dataInfo.defaultDataProvider
        );
      }
      if (dataInfo.defaultOriginDataProvider) {
        this.modulesDafaultOriginProviderKey.set(
          moduleKey,
          dataInfo.defaultOriginDataProvider
        );
      }
    }

    if (!this.modulesDataItems.has(moduleKey)) {
      let dataItems = metaData["dataItems"];
      if (!dataItems) {
        dataItems = new Map<string, DataInfo>();
      }
      this.modulesDataItems.set(moduleKey, dataItems);
    }
  }

  protected tryToFindDataProviderKey(
    dataInfo: DataInfo,
    fromOrigin = false
  ): string {
    let dataProviderKey = null;
    const moduleKey = dataInfo.moduleKey
      ? dataInfo.moduleKey
      : this.injector.get(MODULE_DATA_KEY);
    if (this.modulesDataItems.has(moduleKey)) {
      if (this.modulesDataItems.get(moduleKey).get(dataInfo.dataKey)) {
        const dataProviderInformation = this.modulesDataItems
          .get(moduleKey)
          .get(dataInfo.dataKey);
        dataProviderKey = fromOrigin
          ? dataProviderInformation.originDataProviderKey
          : dataProviderInformation.dataProviderKey;
      }
    }
    if (
      !dataProviderKey &&
      !fromOrigin &&
      this.modulesDafaultProviderKey.has(moduleKey)
    ) {
      dataProviderKey = this.modulesDafaultProviderKey.get(moduleKey);
    }

    if (
      !dataProviderKey &&
      fromOrigin &&
      this.modulesDafaultProviderKey.has(moduleKey)
    ) {
      dataProviderKey = this.modulesDafaultOriginProviderKey.get(moduleKey);
    }

    if (!dataProviderKey) {
      const providers = this.dataProviders.valuesArray().sort(x => x.order);
      for (const x of providers) {
        if (x.isDataProviderFor(dataInfo)) {
          return x.key;
        }
      }
    }
    return dataProviderKey;
  }

  protected tryToFindFromOtherProvidersOnNotFound<T>(
    dataInfo: DataInfo,
    faultDataProvider: DataProvider
  ): Observable<T> {
    const faultDataProviders: DataProvider[] = [faultDataProvider];
    const otherDataProvidrs = this.dataProviders
      .valuesArray()
      .filter(dp => dp.belongsInChain && dp.order > faultDataProvider.order)
      .sort(dp => dp.order);
    let returnObs: Observable<T>;
    if (otherDataProvidrs[0]) {
      returnObs = otherDataProvidrs[0].getData(dataInfo);
    }
    let index = 0;
    for (const item of otherDataProvidrs) {
      if (index !== 0) {
        returnObs = returnObs.pipe<T>(
          mergeMap(result => {
            if (result != null && result !== undefined) {
              return of(result);
            } else {
              faultDataProviders.push(item);
              return item.getData(dataInfo);
            }
          })
        );
      }
      index++;
    }
    return returnObs.pipe(
      tap(result => {
        if (result != null && result !== undefined) {
          if (faultDataProviders.length !== 1) {
            faultDataProviders.pop();
          }

          for (const item of faultDataProviders) {
            if (isDataStorage(item)) {
              item.addItem([
                {
                  dataInfo: dataInfo,
                  data: result
                }
              ]);
            }
          }
        }
      })
    );
  }
  getData(dataInfo: DataInfo, options?: DataOption): Observable<any>;
  getData<T>(dataInfo: DataInfo, options?: DataOption): Observable<T>;
  getData<T>(dataInfo: DataInfo, options?: DataOption): Observable<T> {
    let dataProviderKey = dataInfo.dataProviderKey;
    if (options && options.fromOrigin) {
      dataProviderKey = dataInfo.originDataProviderKey;
      if (!dataProviderKey) {
        dataProviderKey = this.tryToFindDataProviderKey(dataInfo, true);
      }
    }

    if (!dataProviderKey) {
      dataProviderKey = this.tryToFindDataProviderKey(dataInfo);
    }

    if (dataProviderKey) {
      const dataProvider = this.dataProviders.get(dataProviderKey);
      return dataProvider.getData(dataInfo).pipe(
        mergeMap(x => {
          if (x != null && x !== undefined) {
            if (options && options.fromOrigin) {
              if (
                dataInfo.dataProviderKey &&
                dataInfo.dataProviderKey !== dataProviderKey
              ) {
                const originalDataProvider = this.dataProviders.get(
                  dataInfo.dataProviderKey
                );
                if (isDataStorage(originalDataProvider)) {
                  originalDataProvider.addItem([
                    {
                      dataInfo: dataInfo,
                      data: x
                    }
                  ]);
                }
              }
            }
            return of(x);
          } else {
            return this.tryToFindFromOtherProvidersOnNotFound(
              dataInfo,
              dataProvider
            );
          }
        }),
        first()
      );
    } else {
      return of(null);
    }
  }

  getDataStream(dataInfo: DataInfo, options?: DataOption): Observable<any>;
  getDataStream<T>(dataInfo: DataInfo, options?: DataOption): Observable<T>;
  getDataStream<T>(dataInfo: DataInfo, options?: DataOption): Observable<T> {
    let dataProviderKey;
    if (options.fromOrigin) {
      dataProviderKey = dataInfo.originDataProviderKey;
      if (!dataProviderKey) {
        dataInfo.dataProviderKey = this.tryToFindDataProviderKey(
          dataInfo,
          true
        );
      }
    }
    if (dataProviderKey) {
      dataProviderKey = this.tryToFindDataProviderKey(dataInfo);
    }
    if (!dataProviderKey) {
      throw new Error("For dataStream the dataProviderKey must be set");
    }

    const dataProvider = this.dataProviders.get(dataProviderKey);
    return dataProvider.getDataStream<T>(dataInfo);
  }
}
