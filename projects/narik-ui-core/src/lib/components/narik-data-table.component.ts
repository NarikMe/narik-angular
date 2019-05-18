import { NarikUiComponent } from "../base/narik-ui-component";
import {
  ListRowCommand,
  NarikViewField,
  IPagingInfo,
  NarikDataSource
} from "narik-infrastructure";
import { Input, Output, EventEmitter } from "@angular/core";
import { isArray } from "narik-common";
export class NarikDataTable extends NarikUiComponent {
  get uiKey(): string {
    return "data-table";
  }

  _fields: NarikViewField[];
  _pagingInfo: IPagingInfo;
  _dataSource: NarikDataSource<any>;
  _selectedItem: any;
  _selectedItems: any[];

  @Input()
  set selectedItems(value: any[]) {
    this._selectedItems = value;
    this.selectedItemsChange.emit(value);
  }
  get selectedItems(): any[] {
    return this._selectedItems;
  }

  @Input()
  set selectedItem(value: any) {
    if (this._selectedItem !== value) {
      this._selectedItem = value;
      this.selectedItemChange.emit(value);
    }
  }
  get selectedItem(): any {
    return this._selectedItem;
  }

  @Input()
  set dataSource(value: NarikDataSource<any>) {
    this._dataSource = value;
  }
  get dataSource(): NarikDataSource<any> {
    return this._dataSource;
  }

  @Input()
  set fields(value: NarikViewField[]) {
    if (value && isArray(value)) {
      for (const field of value) {
        field.options = field.options || {};
      }
    }
    this._fields = value;
  }
  get fields(): NarikViewField[] {
    return this._fields;
  }

  @Input()
  set pagingInfo(value: IPagingInfo) {
    this._pagingInfo = value;
  }
  get pagingInfo(): IPagingInfo {
    return this._pagingInfo;
  }

  @Input()
  rowCommands?: ListRowCommand[];

  @Input()
  rowCommandType?: "Menu" | "Flat" = "Flat";

  @Output()
  rowCommandClick = new EventEmitter<{ key: string; item: any }>();

  @Output()
  selectedItemsChange = new EventEmitter<any[]>();

  @Output()
  rowDoubleClick = new EventEmitter<any>();

  @Output()
  selectedItemChange = new EventEmitter<any>();
}

export const NARIK_DATA_TABLE_INPUTS: string[] = [
  "rowCommands",
  "rowCommandType",
  "fields",
  "pagingInfo",
  "dataSource",
  "selectedItems",
  "selectedItem"
];

export const NARIK_DATA_TABLE_OUTPUTS: string[] = [
  "rowCommandClick",
  "selectedItemsChange",
  "rowDoubleClick",
  "selectedItemChange"
];
