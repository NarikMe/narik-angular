import { isArray, isPresent, isString, toFilterFunction } from '@narik/common';
import {
    FilterItems,
    NarikDataSource,
    NarikViewField,
} from '@narik/infrastructure';
import { NarikDataTable } from '@narik/ui-core';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Component, Injector, Input, OnInit } from '@angular/core';

import { SwimlaneLazyDataSource } from '../data-source/swimlane-lazy-data-source';

@Component({
    selector: 'narik-swimlane-data-table , narik-data-table',
    templateUrl: 'narik-swimlane-data-table.component.html',
    styleUrls: ['narik-swimlane-data-table.component.css'],
})
export class NarikSwimlaneDataTable extends NarikDataTable implements OnInit {
    _selectMode: 'none' | 'single' | 'checkbox' = 'checkbox';
    page: any = {
        size: undefined,
        pageNumber: 0,
        totalElements: 0,
    };
    sort: any[] = [];
    filter: any = undefined;
    getRowClass: any;
    filterObj: any = {};
    rows: any[] = [];
    allData: any[] = [];
    _dataSource: NarikDataSource<any>;
    searchSubject = new Subject<any>();

    isServerSide = false;

    @Input()
    set dataSource(value: NarikDataSource<any>) {
        this._dataSource = value;
        this.isServerSide = false;
        if (value) {
            if (isArray(value)) {
                this.rows = <any>value;
                this.allData = <any>[...(<any>value)];
            } else {
                this.isServerSide = true;
                value.dataObservable.subscribe((result) => {
                    this.rows = result;
                    this.page.totalElements = (<SwimlaneLazyDataSource<any>>(
                        value
                    )).totalCount;
                });
            }
        } else {
            this.rows = [];
        }
    }
    get dataSource(): NarikDataSource<any> {
        return this._dataSource;
    }

    @Input()
    set selectMode(value: 'none' | 'single' | 'checkbox') {
        this._selectMode = value;
    }
    get selectMode(): 'none' | 'single' | 'checkbox' {
        return this._selectMode;
    }

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        const that = this;
        this.getRowClass = (row) => {
            return {
                selected: that.selectedItem === row,
            };
        };
        if (this.selectMode === 'checkbox') {
            const checkBoxField: any = {
                sortable: false,
                canAutoResize: false,
                draggable: false,
                resizeable: false,
                headerCheckboxable: true,
                checkboxable: true,
                width: 30,
            };
            this.fields.unshift(checkBoxField);
        }

        if (this.pagingInfo) {
            this.page = {
                size: this.pagingInfo.pageSize,
                pageNumber: 0,
            };
        }
        this.fields.forEach((x) => {
            this.filterObj['$$' + (<any>x).prop] = x.type;
        });
        if (this.isServerSide) {
            this.refreshServerData();
        }

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
                            return (x.column.prop = y.column.prop);
                        }
                        return false;
                    }
                )
            )
            .subscribe((f) => {
                this.doFilter(f.filterValue, f.column);
            });
    }

    onSelect(e) {
        if (this.selectMode === 'checkbox') {
            this.selectedItems = e.selected;
        } else {
            this.selectedItem = e.selected ? e.selected[0] : undefined;
        }
    }

    onActivate(event) {
        if (this.selectMode === 'checkbox' && event.type == 'click') {
            this.selectedItem = event.row;
        }
        if (event.type === 'dblclick') {
            this.rowDoubleClick.emit(event.row);
        }
    }

    setPage(event) {
        this.page.pageNumber = event.offset;
        this.refreshServerData();
    }
    onSort(event) {
        this.sort = event.sorts;
        this.refreshServerData();
    }

    refreshServerData() {
        (<SwimlaneLazyDataSource<any>>this.dataSource).loadOptions = {
            index: this.page.pageNumber,
            size: this.page.size,
            sort: this.sort,
            filter: this.filter,
        };
        this.dataSource.loadData();
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
            this.filter = filter;
            this.refreshServerData();
        } else {
            if (filter) {
                const filterFunction = toFilterFunction(filter);
                this.rows = this.allData.filter(filterFunction);
            } else {
                this.rows = this.allData;
            }
        }
    }

    createFilter(filterValue, column: NarikViewField): FilterItems {
        this.filterObj[
            column ? (<any>column).prop : '$$overallFilter'
        ] = isString(filterValue) ? filterValue.trim() : filterValue;

        const filter0: FilterItems = {
            condition: 'or',
            filters: [],
        };
        if (this.filterObj['$$overallFilter']) {
            this.fields.forEach((x) => {
                if ((<any>x).prop && (!x.type || x.type === 'text')) {
                    filter0.filters.push({
                        field: (<any>x).prop,
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
        } else if (
            filter1.filters.length !== 0 &&
            filter0.filters.length === 0
        ) {
            return filter1;
        } else if (
            filter1.filters.length !== 0 &&
            filter0.filters.length !== 0
        ) {
            return {
                condition: 'and',
                filters: [filter0, filter1],
            };
        } else {
            return null;
        }
    }
}
