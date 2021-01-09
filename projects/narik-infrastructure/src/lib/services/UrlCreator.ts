import { PagingParameters } from '../interfaces/data-info.model';

/**
 * Url creator
 */
export abstract class UrlCreator {
    /**
     * Key  of url creator
     */
    readonly key: string;

    /**
     * Applys parameters
     * @param url
     * @param parameters
     * @returns parameters
     */
    abstract applyParameters(url: string, parameters: any): string;

    /**
     * Applys paging parameters
     * @param url
     * @param pagingParameter
     * @returns paging parameters
     */
    abstract applyPagingParameters(
        url: string,
        pagingParameter: PagingParameters
    ): string;
}
