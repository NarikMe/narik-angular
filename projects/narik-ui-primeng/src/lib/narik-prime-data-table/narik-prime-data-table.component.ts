import { NarikDataTable } from "@narik/ui-core";

import { Component, Injector, Input } from "@angular/core";
import { NarikDataSource } from "@narik/infrastructure";
import { isArray } from "@narik/common";
import { PrimeLazyDataSource } from "../data-source/prime-lazy-data-source";

@Component({
  selector: "narik-prime-data-table , narik-data-table",
  templateUrl: "narik-prime-data-table.component.html"
})
export class NarikPrimeDataTable extends NarikDataTable {
  isServerSide = false;
  totalRecords = 0;
  rows: any[] = [];

  @Input()
  set dataSource(value: NarikDataSource<any>) {
    this._dataSource = value;
    this.isServerSide = false;
    if (value) {
      if (isArray(value)) {
        this.rows = <any>value;
      } else {
        this.isServerSide = true;
        value.dataObservable.subscribe(result => {
          this.rows = result;
          this.totalRecords = (<PrimeLazyDataSource<any>>value).totalCount;
        });
      }
    } else {
      this.rows = [];
    }
  }
  get dataSource(): NarikDataSource<any> {
    return this._dataSource;
  }

  constructor(injector: Injector) {
    super(injector);
  }

  refreshServerData(pageInfo) {
    (<PrimeLazyDataSource<any>>this.dataSource).loadOptions = {
      index: pageInfo.first / pageInfo.rows,
      size: pageInfo.rows,
      sortField: pageInfo.sortField,
      sortOrder: pageInfo.sortOrder,
      filter: this.createFilter(pageInfo.filters)
    };
    this.dataSource.loadData();
  }

  rowDblClick(e) {
    this.rowDoubleClick.emit(e);
  }

  createFilter(filter) {
    var result = {
      condition: "and",
      filters: []
    };
    if (!filter) {
      return undefined;
    }

    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        result.filters.push({
          field: key,
          value: filter[key].value,
          operator: "contains"
        });
      }
    }

    return result.filters.length ? result : undefined;
  }
}
