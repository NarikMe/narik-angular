import { isPresent, isString, toFilterFunction, isArray } from '@narik/common';
import {
  NarikDataSource,
  FilterItems,
  NarikViewField,
  IPagingInfo,
} from '@narik/infrastructure';
import { NarikDataTable } from '@narik/ui-core';
import { Subject } from 'rxjs';

import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterContentInit,
  ChangeDetectorRef,
  AfterViewChecked,
  Injector,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatLazyDataSource } from '../data-source/mat-lazy-data-source';
import { MatLocalDataSource } from '../data-source/mat-local-data-source';
import { takeWhile } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'narik-mat-data-table , narik-data-table',
  templateUrl: 'narik-mat-data-table.component.html',
})
export class NarikMatDataTable
  extends NarikDataTable
  implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked {
  fieldNames: string[] = [];
  filterObj: any = {};
  private _sort: MatSort;
  private _paginator: MatPaginator;

  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    this._sort = value;
    this.setUiOptionsOnDataSource();
  }
  get sort(): MatSort {
    return this._sort;
  }

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this._paginator = value;
    this.setUiOptionsOnDataSource();
  }
  get paginator() {
    return this._paginator;
  }

  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  filterChange = new Subject<FilterItems>();
  selection: SelectionModel<any>;
  _selectMode: 'None' | 'One' | 'Multiple' = 'Multiple';
  _showRowNumber = true;
  _containerCssClass = 'mat-table-container';
  _rowCssClass: string;
  searchSubject = new Subject<any>();

  @Input()
  set rowCssClass(value: string) {
    this._rowCssClass = value;
  }
  get rowCssClass(): string {
    return this._rowCssClass;
  }

  @Input()
  set containerCssClass(value: string) {
    this._containerCssClass = value;
  }
  get containerCssClass(): string {
    return this._containerCssClass;
  }

  @Input()
  set showRowNumber(value: boolean) {
    this._showRowNumber = value;
  }
  get showRowNumber(): boolean {
    return this._showRowNumber;
  }

  @Input()
  set selectMode(value: 'None' | 'One' | 'Multiple') {
    this._selectMode = value;
  }
  get selectMode(): 'None' | 'One' | 'Multiple' {
    return this._selectMode;
  }

  get isServerSide(): boolean {
    return this.dataSource && this.dataSource instanceof MatLazyDataSource;
  }

  get currentData(): any[] {
    return this.dataSource.currentData;
  }

  constructor(injector: Injector, private changeDetector: ChangeDetectorRef) {
    super(injector);
  }

  ngOnInit() {
    this.selection = new SelectionModel<any>(
      this.selectMode === 'Multiple',
      []
    );
    this.selection.changed.subscribe((x) => {
      this.selectedItems = this.selection.selected;
    });

    this.searchSubject
      .pipe(
        debounceTime(200),
        distinctUntilChanged(
          (
            x: { filterValue: string; column: any },
            y: { filterValue: string; column: any }
          ) => {
            if (!x) {
              return false;
            }
            if (x.filterValue !== y.filterValue) {
              return false;
            }
            if (!x.column && !y.column) {
              return true;
            }
            if (x.column && y.column) {
              return (x.column.model = y.column.model);
            }
            return false;
          }
        )
      )
      .subscribe((f) => {
        this.doFilter(f.filterValue, f.column);
      });
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.initDataSource(this.dataSource);
    }
  }
  ngAfterContentInit() {}
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  public select(row: any) {
    this.selectedItem = row;
  }
  dblclick(row) {
    this.rowDoubleClick.emit(row);
  }

  setUiOptionsOnDataSource() {
    if (this.dataSource) {
      if (this.dataSource instanceof MatLocalDataSource) {
        this.initLocalDataSource(this.dataSource as MatLocalDataSource<any>);
      } else {
        this.initRemoteDataSource(this.dataSource as MatLazyDataSource<any>);
      }
    }
  }

  initDataSource(ds: NarikDataSource<any>) {
    this.setUiOptionsOnDataSource();
    this.dataSource.dataObservable
      .pipe(takeWhile((x) => this.isAlive))
      .subscribe((x) => {
        this.selection.clear();
      });
    this.dataSource.loadData();
  }
  initLocalDataSource(ds: MatLocalDataSource<any>) {
    ds.sort = this.sort;
    ds.paginator = this.paginator;
  }

  initRemoteDataSource(ds: MatLazyDataSource<any>) {
    ds.filterSubject = this.filterChange;
    ds.sort = this.sort;
    ds.paginator = this.paginator;
  }

  makeColumns() {
    this.fieldNames = this.fields ? this.fields.map((x) => x.model) : [];
    if (this.selectMode !== 'None') {
      this.fieldNames.unshift('select');
    }
    if (this.showRowNumber) {
      this.fieldNames.unshift('index');
    }
    if (this.rowCommands && this.rowCommands.length !== 0) {
      this.fieldNames.push('actions');
    }

    this.fields.forEach((x) => {
      this.filterObj['$$' + x.model] = x.type;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.currentData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.currentData.forEach((row) => this.selection.select(row));
  }
  applyFilter(filterValue, column?: NarikViewField) {
    this.searchSubject.next({
      filterValue: filterValue,
      column: column,
    });
  }
  doFilter(filterValue, column?: NarikViewField) {
    const filter = this.createFilter(filterValue, column);

    if (this.isServerSide) {
      this.filterChange.next(filter);
    } else {
      if (filter) {
        const filterFunction = toFilterFunction(filter);
        (this.dataSource as MatLocalDataSource<any>).filter = <any>(
          filterFunction
        );
      } else {
        (this.dataSource as MatLocalDataSource<any>).filter = null;
      }
    }
  }

  createFilter(filterValue, column: NarikViewField): FilterItems {
    this.filterObj[column ? column.model : '$$overallFilter'] = isString(
      filterValue
    )
      ? filterValue.trim()
      : filterValue;

    const filter0: FilterItems = {
      condition: 'or',
      filters: [],
    };
    if (this.filterObj['$$overallFilter']) {
      this.fields.forEach((x) => {
        if (!x.type || x.type === 'text') {
          filter0.filters.push({
            field: x.model,
            operator: 'contains',
            value: this.filterObj['$$overallFilter'],
          });
        }
      });
    }

    const filter1: FilterItems = {
      condition: 'and',
      filters: [],
    };
    for (const filterKey in this.filterObj) {
      if (!filterKey.startsWith('$$')) {
        if (
          this.filterObj.hasOwnProperty(filterKey) &&
          isPresent(this.filterObj[filterKey]) &&
          this.filterObj[filterKey] !== ''
        ) {
          filter1.filters.push({
            field: filterKey,
            operator:
              !this.filterObj['$$' + filterKey] ||
              this.filterObj['$$' + filterKey] === 'text'
                ? 'contains'
                : 'eq',
            value: this.filterObj[filterKey],
          });
        }
      }
    }
    if (filter0.filters.length !== 0 && filter1.filters.length === 0) {
      return filter0;
    } else if (filter1.filters.length !== 0 && filter0.filters.length === 0) {
      return filter1;
    } else if (filter1.filters.length !== 0 && filter0.filters.length !== 0) {
      return {
        condition: 'and',
        filters: [filter0, filter1],
      };
    } else {
      return null;
    }
  }

  rowCommandClicked(commandKey, row) {
    this.rowCommandClick.emit({
      key: commandKey,
      item: row,
    });
  }

  protected fieldsChanged() {
    super.fieldsChanged();
    this.makeColumns();
  }
}
