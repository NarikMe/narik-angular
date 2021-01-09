import { DataInfo } from '@narik/infrastructure';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { Inject, Injectable, Injector, Optional } from '@angular/core';

import { LOCAL_STORAGE_VALIDITY_LEN } from '../../injectionTokens';
import {
    NarikBaseDataStorage,
    StorageModel,
} from '../../base/narik-base-data-storage';

@Injectable()
export class LocalStorageDataProvider extends NarikBaseDataStorage {
    key = 'localStorage';
    order = 3;
    belongsInChain = true;

    constructor(
        injector: Injector,
        @Optional()
        @Inject(LOCAL_STORAGE_VALIDITY_LEN)
        validityLen: number
    ) {
        super(injector);
        this.validityLen = validityLen || 2 * 60;
    }

    getStorageModel<T>(dataInfo: DataInfo): Observable<StorageModel> {
        const dataStorage = JSON.parse(
            localStorage.getItem(this.getFullKey(dataInfo))
        );
        return of(dataStorage);
    }

    isDataProviderFor(dataInfo: DataInfo): boolean {
        return false;
    }
    addItem(dataItmes: { dataInfo: DataInfo; data: any }[]): Observable<any> {
        for (const data of dataItmes) {
            localStorage.setItem(
                this.getFullKey(data.dataInfo),
                JSON.stringify(
                    this.compeleteStorageData(
                        data.data,
                        data.dataInfo.validityLen
                    )
                )
            );
            this.raiseDataStream(data.dataInfo, data.data);
        }
        return of(true);
    }

    clear(): Observable<any> {
        localStorage.clear();
        return of(true);
    }
    removeItems(items: DataInfo[]): Observable<any> {
        items.forEach((x) => {
            localStorage.removeItem(this.getFullKey(x));
        });
        return of(true);
    }
}
