import { Observable } from 'rxjs';

import { DataInfo } from '../interfaces/data-info.model';

/**
 * Remote data provider service
 */
export abstract class RemoteDataProviderService {
    /**
     * handle data
     * @template T
     * @param dataInfo
     * @returns data
     */
    abstract handleData<T = any>(dataInfo: DataInfo): Observable<T>;
    /**
     * get dataStream
     * @template T
     * @param dataInfo
     * @returns data
     */
    abstract getDataStream<T = any>(dataInfo: DataInfo): Observable<T>;
}
