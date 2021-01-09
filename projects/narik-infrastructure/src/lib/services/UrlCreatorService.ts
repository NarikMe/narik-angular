import { PagingParameters } from '../interfaces/data-info.model';

/**
 * Url creator service
 */
export abstract class UrlCreatorService {
    /**
     * Applys parameters
     * @param key
     * @param url
     * @param parameters
     * @returns parameters
     */
    abstract applyParameters(key: string, url: string, parameters: any): string;

    /**
     * Applys paging parameters
     * @param key
     * @param url
     * @param pagingParameter
     * @returns paging parameters
     */
    abstract applyPagingParameters(
        key: string,
        url: string,
        pagingParameter: PagingParameters
    ): string;
}
