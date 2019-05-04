import { DataInfo, DataOption } from "./../interfaces/data-info.model";
import { Observable } from "rxjs/internal/Observable";

/**
 * Data provider Service
 * Data Provider Service manages all dataProviders inside application.
 * {@link https://github.com/NarikMe/narik-angular/wiki/Data-framework| more information }
 */
export abstract class DataProviderService {
  /**
   * Gets data
   * @param dataInfo information about data that should be retrieved
   * @param options options about data that should be retrieved
   * @returns data An `Observable` that emit whenever data returned. It emits only once.
   */
  abstract getData(dataInfo: DataInfo, options?: DataOption): Observable<any>;
  /**
   * Gets data
   * @param dataInfo information about data that should be retrieved
   * @param options options about data that should be retrieved
   * @returns data An `Observable` that emit whenever data returned. It emits only once.
   */

  abstract getData<T>(dataInfo: DataInfo, options?: DataOption): Observable<T>;

  /**
   * Gets getDataStream
   * @param dataInfo information about data that should be retrieved
   * @param options options about data that should be retrieved
   * @returns data An `Observable` that emit whenever data changed. It emits whenever data changed.
   */

  abstract getDataStream(
    dataInfo: DataInfo,
    options?: DataOption
  ): Observable<any>;
  /**
   * Gets getDataStream
   * @param dataInfo information about data that should be retrieved
   * @param options options about data that should be retrieved
   * @returns data An `Observable` that emit whenever data changed. It emits whenever data changed.
   */
  abstract getDataStream<T>(
    dataInfo: DataInfo,
    options?: DataOption
  ): Observable<T>;
}
