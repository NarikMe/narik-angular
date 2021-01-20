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

    getData<T = any>(dataInfo: DataInfo): Observable<T> {
        return this.remoteDataProvider.handleData(dataInfo);
    }

    getDataStream<T = any>(dataInfo: DataInfo): Observable<T> {
        return this.remoteDataProvider.getDataStream(dataInfo);
    }
}
