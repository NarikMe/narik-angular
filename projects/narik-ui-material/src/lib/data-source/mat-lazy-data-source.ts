import { QueryService, ServerResponse } from "@narik/app-core";
import {
  DataInfo,
  NarikDataSource,
  FilterItems,
  PagingParameters,
  DataProviderService
} from "@narik/infrastructure";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { debounceTime } from "rxjs/operators";
import { distinctUntilChanged } from "rxjs/operators";
import { finalize } from "rxjs/operators";
import { tap } from "rxjs/operators";
import { Subject } from "rxjs";

import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

export class MatLazyDataSource<T> implements DataSource<T>, NarikDataSource<T> {
  private dataSubject = new BehaviorSubject<T[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  currentData: T[];
  _paginator: MatPaginator | null;
  _sort: MatSort | null;
  _filterSubject: Subject<FilterItems>;
  _filter: FilterItems;

  set filter(value: FilterItems) {
    this._filter = value;
    this.paginator.pageIndex = 0;
    this.loadData();
  }
  get filter(): FilterItems {
    return this._filter;
  }

  set filterSubject(value: Subject<FilterItems>) {
    this._filterSubject = value;
    if (this._filterSubject) {
      this._filterSubject
        .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap((filter: FilterItems) => {
            this.filter = filter;
          })
        )
        .subscribe();
    }
  }
  get filterSubject(): Subject<FilterItems> {
    return this._filterSubject;
  }

  set sort(value: MatSort | null) {
    this._sort = value;
    if (this._sort) {
      this.sort.sortChange.pipe(tap(() => this.loadData())).subscribe();
    }
  }
  get sort(): MatSort | null {
    return this._sort;
  }

  set paginator(value: MatPaginator | null) {
    this._paginator = value;
    if (this._paginator != null) {
      this.paginator.page.pipe(tap(() => this.loadData())).subscribe();
    }
  }
  get paginator(): MatPaginator | null {
    return this._paginator;
  }

  get dataObservable(): Observable<T[]> {
    return this.dataSubject.asObservable();
  }
  get loadingObservable(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  constructor(
    private queryService: QueryService<T>,
    private dataInfoGetter: () => DataInfo,
    private dataProviderService: DataProviderService = null
  ) {}

  loadData(remoteDataParams?: PagingParameters) {
    remoteDataParams = remoteDataParams || {
      pageIndex: this.paginator.pageIndex,
      pageCount: this.paginator.pageSize,
      sort: this.sort.direction
        ? [
            {
              field: this.sort.active,
              order: this.sort.direction
            }
          ]
        : undefined,
      filter: this.filter
    };
    this.loadingSubject.next(true);

    const dataInfo = this.dataInfoGetter();

    dataInfo.pagingParameter = remoteDataParams;
    if (this.queryService) {
      this.queryService
        .getList(dataInfo)
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((result: ServerResponse<T[]>) => {
          this.currentData = result.data;
          if (this.paginator) {
            this.paginator.length = result.count;
          }
          this.dataSubject.next(result.data);
        });
    } else {
      this.dataProviderService
        .getData(dataInfo)
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((result: any) => {
          this.currentData = result.result;
          if (this.paginator) {
            this.paginator.length = result.count;
          }
          this.dataSubject.next(result.result);
        });
    }
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }
}
