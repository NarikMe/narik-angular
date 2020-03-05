import { DataInfo, DataProvider, DataStorage } from "@narik/infrastructure";
import { Observable } from "rxjs";
import { of } from "rxjs";

import { Inject, Injectable, Injector, Optional } from "@angular/core";

import { SESSION_STORAGE_VALIDITY_LEN } from "../../injectionTokens";
import {
  NarikBaseDataStorage,
  StorageModel
} from "../../base/narik-base-data-storage";

@Injectable()
export class SessionStorageDataProvider extends NarikBaseDataStorage
  implements DataProvider, DataStorage {
  key = "sessionStorage";
  order = 2;
  supportAdd = true;
  belongsInChain = true;

  constructor(
    injector: Injector,
    @Optional()
    @Inject(SESSION_STORAGE_VALIDITY_LEN)
    validityLen: number
  ) {
    super(injector);
    this.validityLen = validityLen || 2 * 60;
  }

  getStorageModel<T>(dataInfo: DataInfo): Observable<StorageModel> {
    const dataStorage = JSON.parse(
      sessionStorage.getItem(this.getFullKey(dataInfo))
    );
    return of(dataStorage);
  }

  isDataProviderFor(dataInfo: DataInfo): boolean {
    return false;
  }
  addItem(dataItmes: { dataInfo: DataInfo; data: any }[]): Observable<any> {
    for (const data of dataItmes) {
      sessionStorage.setItem(
        this.getFullKey(data.dataInfo),
        JSON.stringify(
          this.compeleteStorageData(data.data, data.dataInfo.validityLen)
        )
      );
      this.raiseDataStream(data.dataInfo, data.data);
    }
    return of(true);
  }
  clear(): Observable<any> {
    sessionStorage.clear();
    return of(true);
  }
  removeItems(items: DataInfo[]): Observable<any> {
    items.forEach(x => {
      sessionStorage.removeItem(this.getFullKey(x));
    });
    return of(true);
  }
}
