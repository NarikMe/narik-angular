import { Observable } from 'rxjs';
import { isString } from '@narik/common';
import { NarikBaseDataProvider } from './narik-base-data-provider';
import { DataStorage, DataInfo } from '@narik/infrastructure';
import { map } from 'rxjs/operators';

export abstract class NarikBaseDataStorage
    extends NarikBaseDataProvider
    implements DataStorage {
    validityLen = 0;

    abstract clear(): Observable<any>;
    abstract getStorageModel<T>(dataInfo: DataInfo): Observable<StorageModel>;
    abstract removeItems(items: DataInfo[]): Observable<any>;
    abstract addItem(
        dataItmes: { dataInfo: DataInfo; data: any }[]
    ): Observable<any>;

    compeleteStorageData(data: any, validityLen?: number): StorageModel {
        return {
            data: data,
            dataTime: new Date(),
            validityLen: validityLen,
        };
    }

    getData(dataInfo: DataInfo): Observable<any>;
    getData<T>(dataInfo: DataInfo): Observable<T>;
    getData<T>(dataInfo: DataInfo): Observable<T> {
        return this.getStorageModel(dataInfo).pipe(
            map((result) => this.checkAndReturn(result))
        );
    }

    checkAndReturn<T>(storageData: StorageModel): T {
        if (storageData == null || storageData === undefined) {
            return null;
        }
        let result: T = storageData.data;
        if (storageData.dataTime && this.validityLen) {
            if (isString(storageData.dataTime)) {
                storageData.dataTime = new Date(storageData.dataTime);
            }
            const validTime = new Date(
                storageData.dataTime.getTime() +
                    (storageData.validityLen || this.validityLen) * 60000
            );
            if (validTime < new Date()) {
                result = null;
            }
        }
        return result;
    }

    applyValidity(dataItems: { dataInfo: DataInfo; validDate: Date }[]) {
        const mustRemoveItems: DataInfo[] = [];
        for (const dataItem of dataItems) {
            this.getStorageModel(dataItem.dataInfo).subscribe(
                (storageData: StorageModel) => {
                    if (storageData) {
                        if (isString(storageData.dataTime)) {
                            storageData.dataTime = new Date(
                                storageData.dataTime
                            );
                        }
                        if (storageData.dataTime < dataItem.validDate) {
                            mustRemoveItems.push(dataItem.dataInfo);
                        }
                    }
                }
            );
        }
        if (mustRemoveItems.length !== 0) {
            this.removeItems(mustRemoveItems);
        }
    }
}

export interface StorageModel {
    validityLen?: number;
    dataTime?: Date;
    data: any;
}
