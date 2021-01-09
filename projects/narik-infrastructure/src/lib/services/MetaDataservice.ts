import { MetaData, View, Entity } from './../interfaces/meta-data.model';
import { DataInfo } from '../interfaces/data-info.model';
import { Observable } from 'rxjs';

/**
 * Meta data service
 */
export abstract class MetaDataService {
    /**
     * Meta data added of meta data service
     */
    readonly metaDataAdded: Observable<{ key: string; metaData: MetaData }>;

    /**
     * Gets meta data
     * @param moduleKey
     * @returns meta data
     */
    abstract getMetaData(moduleKey: string): MetaData;

    /**
     * Gets all meta data
     * @returns all meta data
     */
    abstract getAllMetaData(): Map<string, MetaData>;

    /**
     * Gets view information
     * @param moduleKey
     * @param itemKey
     * @returns view information
     */
    abstract getViewInformation(moduleKey: string, itemKey: string): View;

    /**
     * Gets entity information
     * @param moduleKey
     * @param itemKey
     * @returns entity information
     */
    abstract getEntityInformation(moduleKey: string, itemKey: string): Entity;

    /**
     * Gets data item information
     * @param moduleKey
     * @param itemKey
     * @returns data item information
     */
    abstract getDataItemInformation(
        moduleKey: string,
        itemKey: string
    ): DataInfo;

    /**
     * Gets information
     * @param informationKey
     * @param moduleKey
     * @param itemKey
     * @returns information
     */
    abstract getInformation<T>(
        informationKey: string,
        moduleKey: string,
        itemKey: string
    ): T;

    /**
     * Gets value
     * @param moduleKey
     * @param informationKey
     * @returns value
     */
    abstract getValue<T>(moduleKey: string, informationKey: string): T;
}

/**
 * Default meta data keys
 */
export enum DefaultMetaDataKeys {
    views = 'views',
    entities = 'entities',
    dataItems = 'dataItems',
    toolbars = 'toolbars',
}
