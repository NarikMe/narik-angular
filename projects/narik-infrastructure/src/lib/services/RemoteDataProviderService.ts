import { Observable } from 'rxjs';

import { DataInfo } from '../interfaces/data-info.model';

/**
 * Remote data provider service
 */
export abstract class RemoteDataProviderService {
    /**
     * Gets data
     * @param dataInfo
     * @returns data
     */
    abstract getData(dataInfo: DataInfo): Observable<any>;

    /**
     * Gets data
     * @template T
     * @param dataInfo
     * @returns data
     */
    abstract getData<T>(dataInfo: DataInfo): Observable<T>;

    /**
     * Gets data stream
     * @param dataInfo
     * @returns data stream
     */
    abstract getDataStream(dataInfo: DataInfo): Observable<any>;

    /**
     * Gets data stream
     * @param dataInfo
     * @returns data stream
     */
    abstract getDataStream<T>(dataInfo: DataInfo): Observable<T>;
}
