import {
    DataStorageService,
    DATA_STORAGE,
    DataInfo,
    DataStorage,
    EventAggregatorService,
    ModuleManager,
    RemoteMessagingService,
    DEFAULT_DATA_STORAGE_KEY,
} from '@narik/infrastructure';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { merge } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable()
export class NarikDataStorageService extends DataStorageService {
    private dataStorages = new Map<string, DataStorage>();

    constructor(
        @Inject(DATA_STORAGE) storages: DataStorage[],
        @Optional()
        @Inject(DEFAULT_DATA_STORAGE_KEY)
        private defaultStorageKey: string,
        private moduleManager: ModuleManager,
        private eventAggregatorService: EventAggregatorService,
        @Optional() private remoteMessagingService: RemoteMessagingService
    ) {
        super();
        storages.forEach((x) => this.dataStorages.set(x.key, x));

        this.moduleManager.narikLoaded.subscribe(() => {
            this.eventAggregatorService
                .listen<DataInfo | DataInfo[]>('CLIENT_DATA_CHANGED')
                .pipe(
                    merge(
                        remoteMessagingService
                            ? this.remoteMessagingService.listen('DATA-CHANGE')
                            : empty()
                    )
                )
                .subscribe((dataInfo: DataInfo) => {
                    for (const storage of this.dataStorages.valuesArray()) {
                        storage.dataChanged(dataInfo);
                    }
                });

            this.eventAggregatorService
                .listen<DataInfo | DataInfo[]>('CLIENT_DATA_INVALIDATE')
                .pipe(
                    merge(
                        remoteMessagingService
                            ? this.remoteMessagingService.listen(
                                  'DATA-INVALIDATE'
                              )
                            : empty()
                    )
                )
                .subscribe(
                    (dataItems: { dataInfo: DataInfo; validDate: Date }[]) => {
                        this.applyValidity(dataItems);
                    }
                );
        });
    }

    getDataStream(key: string, dataInfo: DataInfo): Observable<any>;
    getDataStream<T>(key: string, dataInfo: DataInfo): Observable<T>;
    getDataStream<T>(key: string, dataInfo: DataInfo): Observable<T> {
        key = key || this.defaultStorageKey;
        this.checkKey(key);
        const dataStorage = this.getStorage(key);
        return dataStorage.getDataStream<T>(dataInfo);
    }

    getData(key: string, dataInfo: DataInfo): Observable<any>;
    getData<T>(key: string, dataInfo: DataInfo): Observable<T>;
    getData<T>(key: string, dataInfo: DataInfo): Observable<T> {
        key = key || this.defaultStorageKey;
        this.checkKey(key);
        return this.getStorage(key).getData<T>(dataInfo);
    }
    clear(key: string): Observable<any> {
        this.checkKey(key);
        return this.getStorage(key).clear();
    }
    removeItems(key: string, items: DataInfo[]): Observable<any> {
        key = key || this.defaultStorageKey;
        this.checkKey(key);
        return this.getStorage(key).removeItems(items);
    }
    addData(
        key: string,
        dataItmes: { dataInfo: DataInfo; data: any }[]
    ): Observable<any> {
        key = key || this.defaultStorageKey;
        this.checkKey(key);
        return this.getStorage(key).addItem(dataItmes);
    }

    private getStorage(key: string): DataStorage {
        key = key || this.defaultStorageKey;
        this.checkKey(key);
        return this.dataStorages.get(key);
    }

    applyValidity(dataItems: { dataInfo: DataInfo; validDate: Date }[]) {
        for (const storage of this.dataStorages.valuesArray()) {
            storage.applyValidity(dataItems);
        }
    }

    private checkKey(key: string) {
        if (!key) {
            throw new Error(
                'You must specify storage  key. Either by DEFAULT_DATA_STORAGE_KEY or send it  with method parameter'
            );
        }
    }
}
