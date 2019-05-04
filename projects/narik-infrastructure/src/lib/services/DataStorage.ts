import { Observable } from "rxjs/internal/Observable";
import { DataInfo } from "../interfaces/data-info.model";
import { DataProvider } from "./DataProvider";

/**
 * Data Storage
 * Data Storage is a class that can store data for application.
 *  {@link https://github.com/NarikMe/narik-angular/wiki/Data-framework| more information }
 */
export interface DataStorage extends DataProvider {
  /**
   * clear
   * @returns `Observable` that emit whenever process completed.
   */
  clear(): Observable<any>;

  /**
   * removeItems
   * @param items Data information that should be removed.
   * @returns  `Observable` that emit whenever process completed.
   */
  removeItems(items: DataInfo[]): Observable<any>;

  /**
   * applyValidity
   * This method check if data exists and it's validity date is less that given validity, then remove it from storage.
   * @param dataItems Data information that should their valid date must be changed.
   */
  applyValidity(dataItems: { dataInfo: DataInfo; validDate: Date }[]);

  /**
   * addItem
   * add item to storage
   * @param dataItmes  Data information that should be added.
   * @returns `Observable` that emit whenever process completed.
   */
  addItem(dataItmes: { dataInfo: DataInfo; data: any }[]): Observable<any>;
}


/**
 * Determines whether obj is DataStorage or not.
 * @param obj
 * @returns data storage
 */
export function isDataStorage(obj: any): obj is DataStorage {
  return (<DataStorage>obj).addItem !== undefined;
}
