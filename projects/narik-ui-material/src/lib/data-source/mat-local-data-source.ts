import { QueryService, ServerResponse } from "@narik/app-core";
import {
  DataInfo,
  NarikDataSource,
  PagingParameters
} from "@narik/infrastructure";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { finalize } from "rxjs/operators";

import { MatTableDataSource } from "@angular/material/table";

export class MatLocalDataSource<T> extends MatTableDataSource<T>
  implements NarikDataSource<T> {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private dataSubject = new BehaviorSubject<T[]>(this.data || []);

  get dataObservable(): Observable<T[]> {
    return this.dataSubject.asObservable(); // of(this.data);
  }
  get loadingObservable(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  get currentData(): T[] {
    return this.data;
  }

  constructor(
    private queryService: QueryService<T>,
    private dataInfoGetter: () => DataInfo,
    initialData?: T[]
  ) {
    super(initialData);
    this.filterPredicate = (data: any, filters: any) => {
      if (!filters) {
        return true;
      }
      const filterFunction = filters as (x) => boolean;
      return filterFunction(data);
    };
  }

  setData(data: T[]) {
    this.data = data;
  }

  loadData(remoteDaraParams?: PagingParameters) {
    if (this.queryService) {
      this.loadingSubject.next(true);
      const dataInfo = this.dataInfoGetter();

      this.queryService
        .getList(dataInfo)
        .pipe(
          catchError(() =>
            of({
              data: []
            })
          ),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((result: ServerResponse<T[]>) => {
          this.data = result.data;
          this.dataSubject.next(this.data);
          if (this.paginator) {
            this.paginator.length = result.count;
          }
        });
    }
  }
}
