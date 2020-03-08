import { Observable } from "rxjs";

import { PagingParameters } from "./data-info.model";

/**
 * Narik data source
 *  T  Type of entities inside dataSource
 */
export interface NarikDataSource<T> {
  /**
   * An `Observable` that emit whenever data changed.
   */
  dataObservable: Observable<T[]>;

  /**
   * An `Observable` that emit whenever loading state changed.
   */
  loadingObservable: Observable<boolean>;

  /**
   * Currentdata inside dataSource.
   */
  currentData: T[];

  /**
   * Reload  dataSource
   * @param [remoteDataParams] Remote Data Parmeters (PagingParameters)
   * @param [dataParameters]   Data Parameters For DataSource
   */
  loadData(remoteDataParams?: PagingParameters, dataParameters?: any);
}
