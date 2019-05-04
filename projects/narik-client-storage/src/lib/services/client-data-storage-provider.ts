import { DataInfo } from "narik-infrastructure";
import { Observable } from "rxjs/internal/Observable";

import { Injectable, Injector, Optional, Inject } from "@angular/core";

import { NarikBaseDataStorage, StorageModel } from "narik-core";
import { NgForage } from "ngforage";
import { from } from "rxjs/internal/observable/from";
import { CLIENT_STORAGE_VALIDITY_LEN } from "../injectionTokens";

@Injectable()
export class ClientStorageDataProvider extends NarikBaseDataStorage {
  belongsInChain = true;
  key = "clientStorage";
  order = 4;

  constructor(
    injector: Injector,
    @Optional()
    @Inject(CLIENT_STORAGE_VALIDITY_LEN)
    validityLen: number,
    private readonly ngf: NgForage
  ) {
    super(injector);
    this.validityLen = validityLen || 2 * 60;
  }

  getStorageModel<T>(dataInfo: DataInfo): Observable<StorageModel> {
    const key = this.getFullKey(dataInfo);
    return from(this.ngf.getItem<StorageModel>(key));
  }

  isDataProviderFor(dataInfo: DataInfo): boolean {
    return false;
  }
  addItem(dataItmes: { dataInfo: DataInfo; data: any }[]): Observable<any> {
    const promises: Promise<any>[] = [];
    for (const data of dataItmes) {
      promises.push(
        this.ngf
          .setItem(
            this.getFullKey(data.dataInfo),
            this.compeleteStorageData(data.data, data.dataInfo.validityLen)
          )
          .then(() => this.raiseDataStream(data.dataInfo, data.data))
      );
    }
    return from(promises);
  }
  clear(): Observable<any> {
    return from(this.ngf.clear());
  }
  removeItems(items: DataInfo[]): Observable<any> {
    const promises: Promise<any>[] = [];
    for (const data of items) {
      promises.push(this.ngf.removeItem(this.getFullKey(data)));
    }
    return from(promises);
  }
}
