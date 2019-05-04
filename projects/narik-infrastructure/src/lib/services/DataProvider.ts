import { DataInfo } from "./../interfaces/data-info.model";
import { Observable } from "rxjs/internal/Observable";

/**
 * Data provider
 * Data Provider is a class that provides data for application.
 *  {@link https://github.com/NarikMe/narik-angular/wiki/Data-framework| more information }
 */
export interface DataProvider {
  /**
   * Key of dataProvider
   */
  readonly key: string;

  /**
   * Order of dataProvider
   */
  readonly order: number;

  /**
   * this dataProvider belongs in dataProvider chain or not.
   */
  readonly belongsInChain: boolean;

  /**
   * getData
   *
   * @param dataInfo information about data that should retrieved
   * @returns data An `Observable` that emit whenever data returned. It emits only once.
   */
  getData(dataInfo: DataInfo): Observable<any>;

  /**
   * getData
   *
   * @param dataInfo information about data that should retrieved
   * @returns data An `Observable` that emit whenever data returned. It emits only once.
   */
  getData<T>(dataInfo: DataInfo): Observable<T>;
  /**
   * getDataStream
   *
   * @param dataInfo information about data that should retrieved
   * @returns data An `Observable` that emit whenever data changed. It emits whenever data changed.
   */
  getDataStream(dataInfo: DataInfo): Observable<any>;

  /**
   * getDataStream
   *
   * @param dataInfo information about data that should retrieved
   * @returns data An `Observable` that emit whenever data changed. It emits whenever data changed.
   */
  getDataStream<T>(dataInfo: DataInfo): Observable<T>;

  /**
   * isDataProviderFor
   *
   * @param dataInfo information about data that should checked
   * @returns true if this dataProvider can be provider for this data
   */
  isDataProviderFor(dataInfo: DataInfo): boolean;

  /**
   * dataChanged
   * can be used to inform dataProvider some data has been changed,
   * @param dataInfo  information
   */
  dataChanged(dataInfo: DataInfo | DataInfo[]);
}
