import {
    NarikDataSource,
    PagingParameters,
    DataInfo,
} from '@narik/infrastructure';
import { QueryService, ServerResponse } from '@narik/app-core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

export class PrimeLazyDataSource<T> implements NarikDataSource<T> {
    loadOptions: any;
    totalCount = 0;
    currentData: T[];

    private dataSubject = new BehaviorSubject<T[]>([]);
    private loadingSubject = new Subject<boolean>();

    get dataObservable(): Observable<T[]> {
        return this.dataSubject.asObservable();
    }
    get loadingObservable(): Observable<boolean> {
        return this.loadingSubject.asObservable();
    }

    constructor(
        private queryService: QueryService<T>,
        private dataInfoGetter: () => DataInfo
    ) {}

    loadData(remoteDaraParams?: PagingParameters, dataParameters?: any) {
        this.loadDataInternal(this.loadOptions);
    }

    loadDataInternal(loadOptions: any) {
        if (!loadOptions.size) {
            return;
        }
        loadOptions = loadOptions || this.loadOptions;
        this.loadOptions = loadOptions;

        const remoteDataParams = {
            pageIndex: loadOptions.index,
            pageCount: loadOptions.size,
            sort: loadOptions.sortField
                ? [
                      {
                          field: loadOptions.sortField,
                          order: loadOptions.sortOrder === 1 ? 'asc' : 'desc',
                      },
                  ]
                : undefined,
            filter: loadOptions.filter,
        };

        const dataInfo = this.dataInfoGetter();
        dataInfo.pagingParameter = remoteDataParams;
        this.loadingSubject.next(true);
        this.queryService
            .getList(dataInfo)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)),
                map((result: ServerResponse<T[]>) => {
                    return {
                        data: result.data,
                        totalCount: result.count,
                    };
                })
            )
            .subscribe((result) => {
                this.currentData = result.data;
                this.totalCount = result.totalCount;
                this.dataSubject.next(result.data);
            });
    }

    findOperand(op) {
        const operands = {
            '=': 'eq',
            '<>': 'ne',
            '>': 'gt',
            '>=': 'ge',
            '<': 'lt',
            '<=': 'le',
            startswith: 'startswith',
            endswith: 'endswith',
        };
        return operands[op] || op;
    }
}
