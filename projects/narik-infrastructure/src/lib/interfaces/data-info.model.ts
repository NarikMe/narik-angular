import { FilterItems } from './filter';

/**
 * Data option
 * Options for  getData
 */
export interface DataOption {
    /**
     * fromOrigin : data must be retrived from origin source or not.
     * usually used when you want to refresh data and to ignore cache data.
     */
    fromOrigin?: boolean;
}

/**
 * Data info
 * Information that specifies how and from where data must be retrived.
 */
export interface DataInfo {
    /**
     * dataKey
     * Key of data
     */
    dataKey?: string;

    /**
     * dataUrl
     * Url of data
     */

    dataUrl?: string;

    /**
     * datadataUrlMethod
     * UrlMethod of data
     */

    dataUrlMethod?: string;

    /**
     * dataParameters
     * Parameters of data
     */

    dataParameters?: any;

    /**
     * urlParameters
     * UrlParameters of data
     */

    urlParameters?: any;

    /**
     * moduleKey
     * ModuleKey of data
     */
    moduleKey?: string;

    /**
     * dataMethod
     * DataMethod of data
     * @see {@link #RemoteCallMethodType }
     */
    dataMethod?: RemoteCallMethodType;
    /**
     * dataProviderKey
     * DataProviderKey of data
     */

    dataProviderKey?: string;

    /**
     * validityLen
     * ValidityLen of data
     */
    validityLen?: number;

    /**
     * actionType
     * ActionType of data
     */

    actionType?: DataActionType;
    /**
     * emoteDataProvider
     * RemoteDataProvider of data
     */
    remoteDataProvider?: string;
    /**
     * originDataProviderKey
     * OriginDataProviderKey of data
     */
    originDataProviderKey?: string;
    /**
     * pagingParameter
     * PagingParameter of data
     */
    pagingParameter?: PagingParameters;
}

/**
 * Data url info
 * Specify how data url must be created when it's not specify in DataInfo.dataUrl
 */
export interface DataUrlInfo {
    /**
     * dataPathTemplate
     */
    dataPathTemplate: string;
    /**
     * getPathTemplate
     */
    getPathTemplate: string;
    /**
     * listPathTemplate
     */
    listPathTemplate: string;
    /**
     * postPathTemplate
     */
    postPathTemplate: string;
    /**
     * updatePathTemplate
     */
    updatePathTemplate: string;
    /**
     * deletePathTemplate
     */
    deletePathTemplate: string;
    /**
     * completePathTemplate
     */
    completePathTemplate: string;
    /**
     * parameterPrefix
     */
    parameterPrefix: string;
    /**
     * defaultRemoteDataProvider
     */
    defaultRemoteDataProvider: string;
    /**
     * defaultDataUrlMethod
     */
    defaultDataUrlMethod?: string;
}

/**
 * Paging parameters
 */
export interface PagingParameters {
    pageIndex?: number;
    pageCount?: number;
    sort?: { field: string; order: string }[];
    skip?: number;
    filter?: FilterItems;
}

/**
 * RemoteCallMethodType
 * `GET` | `POST` | `DELETE` | `PUT`
 */

export type RemoteCallMethodType = 'GET' | 'POST' | 'DELETE' | 'PUT';

/**
 * DataActionType
 * `DATA` | `GET` | `LIST` | `POST` | `DELETE` | `COMPLETE` | `UPDATE`
 */

export type DataActionType =
    | 'DATA'
    | 'GET'
    | 'LIST'
    | 'POST'
    | 'DELETE'
    | 'COMPLETE'
    | 'UPDATE';
