import { formatString, isArray } from "narik-common";
import {
  DataInfo,
  MODULE_DATA_KEY,
  DataProviderService,
  DataProvider,
  isDataStorage,
  DataStorage,
  DataOption
} from "narik-infrastructure";

import { Injector } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";
import { first } from "rxjs/internal/operators/first";
import { Observable } from "rxjs/internal/Observable";

export abstract class NarikBaseDataProvider implements DataProvider {
  key: string;
  order: number;
  belongsInChain: boolean;

  dayaKeyTemplate = "{0}_{1}";
  protected dataStreams: Map<string, Subject<any>> = new Map<
    string,
    Subject<any>
  >();

  abstract getData(dataInfo: any): Observable<any>;
  abstract isDataProviderFor(dataInfo: DataInfo): boolean;

  constructor(private injector: Injector) {}

  protected getFullKey(dataInfo: DataInfo): string {
    let moduleKey = dataInfo.moduleKey;
    if (!moduleKey) {
      moduleKey = this.injector.get(MODULE_DATA_KEY);
    }
    return formatString(this.dayaKeyTemplate, moduleKey, dataInfo.dataKey);
  }

  getDataStream(dataInfo: DataInfo): Observable<any>;
  getDataStream<T>(dataInfo: DataInfo): Observable<T>;
  getDataStream<T>(dataInfo: DataInfo): Observable<T> {
    const fullKey = this.getFullKey(dataInfo);
    if (this.dataStreams.has(fullKey)) {
      return this.dataStreams.get(fullKey);
    } else {
      const dataSubject = new ReplaySubject<T>(1);
      this.dataStreams.set(fullKey, dataSubject);
      const dataProviderService = this.injector.get(DataProviderService);
      dataProviderService
        .getData(dataInfo)
        .pipe(first())
        .subscribe(data => dataSubject.next(data));
      return dataSubject.asObservable();
    }
  }

  raiseDataStream(dataInfo: DataInfo, data: any) {
    const fullKey = this.getFullKey(dataInfo);
    if (this.dataStreams.has(fullKey)) {
      this.dataStreams.get(fullKey).next(data);
    }
  }

  dataChanged(dataInfo: DataInfo | DataInfo[]) {
    const dataInfoArray = isArray(dataInfo)
      ? <DataInfo[]>dataInfo
      : [<DataInfo>dataInfo];

    const loadAndRaiseDataStream = () => {
      for (const dataInfoItem of dataInfoArray) {
        const fullKey = this.getFullKey(dataInfoItem);
        if (this.dataStreams.has(fullKey)) {
          const dataStream = this.dataStreams.get(fullKey);
          if (dataStream.observers.length) {
            (<any>this).getData(dataInfoItem).subscribe(result => {
              dataStream.next(result);
            });
          }
        }
      }
    };
    if (isDataStorage(this)) {
      const storage = (<any>this) as DataStorage;
      storage.removeItems(dataInfoArray).subscribe(x => {
        loadAndRaiseDataStream();
      });
    } else {
      loadAndRaiseDataStream();
    }
  }
}
