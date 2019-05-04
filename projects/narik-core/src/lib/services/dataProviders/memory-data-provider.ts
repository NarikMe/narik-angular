import { DataInfo } from "narik-infrastructure";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";

import { Injectable, Injector, Optional, Inject } from "@angular/core";

import {
  StorageModel,
  NarikBaseDataStorage
} from "../../base/narik-base-data-storage";
import { MEMORY_STORAGE_VALIDITY_LEN } from "../../injectionTokens";

@Injectable()
export class MemoryDataProvider extends NarikBaseDataStorage {
  key = "memory";
  order = 1;
  belongsInChain = true;

  private storage = new Map<string, any>();
  constructor(
    injector: Injector,
    @Optional()
    @Inject(MEMORY_STORAGE_VALIDITY_LEN)
    validityLen: number
  ) {
    super(injector);
    this.validityLen = validityLen || 2 * 60;
  }

  getStorageModel<T>(dataInfo: DataInfo): Observable<StorageModel> {
    const dataStorage = this.storage.get(
      this.getFullKey(dataInfo)
    ) as StorageModel;
    return of(dataStorage);
  }

  isDataProviderFor(dataInfo: DataInfo): boolean {
    return false;
  }
  addItem(dataItmes: { dataInfo: DataInfo; data: any }[]): Observable<any> {
    for (const data of dataItmes) {
      const fullkey = this.getFullKey(data.dataInfo);
      this.storage.set(
        fullkey,
        this.compeleteStorageData(data.data, data.dataInfo.validityLen)
      );
      this.raiseDataStream(data.dataInfo, data.data);
    }
    return of(true);
  }
  clear(): Observable<any> {
    this.storage.clear();
    return of(true);
  }
  removeItems(items: DataInfo[]): Observable<any> {
    items.forEach(x => {
      this.storage.delete(this.getFullKey(x));
    });
    return of(true);
  }
}
