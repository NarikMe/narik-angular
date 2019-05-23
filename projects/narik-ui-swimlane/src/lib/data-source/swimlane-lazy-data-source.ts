import {
  NarikDataSource,
  PagingParameters,
  DataInfo
} from "narik-infrastructure";
import { QueryService, ServerResponse } from "narik-app-core";
import { catchError } from "rxjs/internal/operators/catchError";
import { of } from "rxjs/internal/observable/of";
import { map } from "rxjs/internal/operators/map";
import { finalize } from "rxjs/internal/operators/finalize";
import { isArray } from "narik-common";
import { Observable } from "rxjs/internal/Observable";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export class SwimlaneLazyDataSource<T> implements NarikDataSource<T> {
  loadOptions: any;
  totalCount = 0;
  currentData: T[];

  private dataSubject = new BehaviorSubject<T[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

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
      sort:
        loadOptions.sort && loadOptions.sort.length
          ? loadOptions.sort.map(x => {
              return {
                field: x.prop,
                order: x.dir
              };
            })
          : undefined,
      filter: loadOptions.filter
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
            totalCount: result.count
          };
        })
      )
      .subscribe(result => {
        this.currentData = result.data;
        this.totalCount = result.totalCount;
        this.dataSubject.next(result.data);
      });
  }
}
