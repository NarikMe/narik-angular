import { formatString } from '@narik/common';
import { UrlCreator, PagingParameters } from '@narik/infrastructure';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrlCreator extends UrlCreator {
    key = 'api';
    applyParameters(url: string, parameters: any): string {
        if (!parameters) {
            return url;
        }
        return formatString(
            '{0}{1}{2}',
            url,
            url.indexOf('?') >= 0 ? '' : '?',
            Object.keys(parameters)
                .map((x) => {
                    return formatString('{0}={1}', x, parameters[x]);
                })
                .join('&')
        );
    }
    applyPagingParameters(
        url: string,
        pagingParameter: PagingParameters
    ): string {
        throw new Error('Method not implemented.');
    }
}
