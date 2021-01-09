import {
    DataInfo,
    DataProvider,
    RemoteDataProviderService,
} from '@narik/infrastructure';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { Injectable, Injector } from '@angular/core';
import { NarikBaseDataProvider } from '../../base/narik-base-data-provider';

@Injectable()
export class RemoteDataProvider
    extends NarikBaseDataProvider
    implements DataProvider {
    key = 'remote';
    order = 5;

    belongsInChain = true;
    constructor(
        injector: Injector,
        private remoteDataProvider: RemoteDataProviderService
    ) {
        super(injector);
    }

    isDataProviderFor(dataInfo: DataInfo) {
        return true;
    }
    getData(dataInfo: DataInfo): Observable<any>;
    getData<T>(dataInfo: DataInfo): Observable<T>;
    getData<T>(dataInfo: DataInfo): Observable<T> {
        return this.remoteDataProvider.getData(dataInfo);
    }

    getDataStream(dataInfo: DataInfo): Observable<any>;
    getDataStream<T>(dataInfo: DataInfo): Observable<T>;
    getDataStream<T>(dataInfo: DataInfo): Observable<T> {
        return this.remoteDataProvider.getDataStream(dataInfo);
    }
}
