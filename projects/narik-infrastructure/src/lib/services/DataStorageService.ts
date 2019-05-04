import { Observable } from "rxjs/internal/Observable";

import { DataInfo } from "../interfaces/data-info.model";

/**
 * Data storage service
 *  Data Storage Service manages all dataStorages  inside application.
 *  {@link https://github.com/NarikMe/narik-angular/wiki/Data-framework| more information }
 */
export abstract class DataStorageService {
  /**
   * Gets data
   * @param  key dataStorage key
   * @param dataInfo information about data that should be retrieved
   * @returns data An `Observable` that emit whenever data returned. It emits only once.
   */
  abstract getData(key: string, dataInfo: DataInfo): Observable<any>;
  /**
   * Gets data
   * @param  key dataStorage key
   * @param dataInfo information about data that should be retrieved
   * @returns data An `Observable` that emit whenever data returned. It emits only once.
   */
  abstract getData<T>(key: string, dataInfo: DataInfo): Observable<T>;

  /**
   * Gets getDataStream
   * @param  key dataStorage key
   * @param dataInfo information about data that should be retrieved
   * @returns data An `Observable` that emit whenever data changed. It emits whenever data changed.
   */
  abstract getDataStream(key: string, dataInfo: DataInfo): Observable<any>;

  /**
   * Gets getDataStream
   * @param key dataStorage key
   * @param dataInfo information about data that should be retrieved
   * @returns data An `Observable` that emit whenever data changed. It emits whenever data changed.
   */

  abstract getDataStream<T>(key: string, dataInfo: DataInfo): Observable<T>;
  /**
   * clear
   *  @param  key dataStorage key
   * @returns `Observable` that emit whenever process completed.
   */
  abstract clear(key: string): Observable<any>;

  /**
   * removeItems
   * @param items Data information that should be removed.
   * @returns  `Observable` that emit whenever process completed.
   */
  abstract removeItems(key: string, items: DataInfo[]): Observable<any>;
  /**
   * applyValidity
   * This method check if data exists and it's validity date is less that given validity, then remove it from storage.
   * @param dataItems Data information that should their valid date must be changed.
   */
  abstract applyValidity(dataItems: { dataInfo: DataInfo; validDate: Date }[]);

  /**
   * addData
   * add item to storage
   * @param  key dataStorage key
   * @param dataItmes  Data information that should be added.
   * @returns `Observable` that emit whenever process completed.
   */
  abstract addData(
    key: string,
    dataItmes: { dataInfo: DataInfo; data: any }[]
  ): Observable<any>;
}
