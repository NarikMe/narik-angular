import {
  NarikDataSource,
  NarikViewField,
  IPagingInfo
} from "narik-infrastructure";
import { NarikDataTable } from "narik-ui-core";

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  Injector,
  ChangeDetectorRef,
  Inject
} from "@angular/core";
import { DxDataGridComponent } from "devextreme-angular/ui/data-grid";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "narik-dev-data-table , narik-data-table",
  templateUrl: "narik-dev-data-table.component.html"
})
export class NarikDevDataTable extends NarikDataTable {
  _fields: NarikViewField[];
  _pagingInfo: IPagingInfo;
  _dataSource: NarikDataSource<any>;
  _selectMode: "none" | "single" | "multiple" = "multiple";
  _selectedItem: any;
  _selectedItems: any[];
  _filterRow = true;
  _showGroupPanel = false;
  _isServerSide = false;
  rtlEnabled = false;
  allMode = "allPages";
  checkBoxesMode = "onClick";

  @ViewChild(DxDataGridComponent)
  grid: DxDataGridComponent;

  @Output()
  selectedItemsChange = new EventEmitter<any[]>();
  @Output()
  selectedItemChange = new EventEmitter<any>();

  @Input()
  set isServerSide(value: boolean) {
    this._isServerSide = value;
  }
  get isServerSide(): boolean {
    return this._isServerSide;
  }

  @Input()
  set showGroupPanel(value: boolean) {
    this._showGroupPanel = value;
  }
  get showGroupPanel(): boolean {
    return this._showGroupPanel;
  }

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

  @Output()
  rowDoubleClick = new EventEmitter<any>();

  @Input()
  set fields(value: NarikViewField[]) {
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
  set dataSource(value: NarikDataSource<any>) {
    this._dataSource = value;
  }
  get dataSource(): NarikDataSource<any> {
    return this._dataSource;
  }

  @Input()
  set selectMode(value: "none" | "single" | "multiple") {
    this._selectMode = value;
  }
  get selectMode(): "none" | "single" | "multiple" {
    return this._selectMode;
  }

  @Input()
  set filterRow(value: boolean) {
    this._filterRow = value;
  }
  get filterRow(): boolean {
    return this._filterRow;
  }

  constructor(
    injector: Injector,
    private changeDetector: ChangeDetectorRef,
    @Inject(DOCUMENT) private document
  ) {
    super(injector);
    this.rtlEnabled = this.document.dir === "rtl";
  }

  onRowClick(e) {
    if (e) {
      this.selectedItem = e.data;
      const component = e.component,
        prevClickTime = component.lastClickTime;
      component.lastClickTime = new Date();
      if (prevClickTime && component.lastClickTime - prevClickTime < 300) {
        this.rowDoubleClick.emit(this.selectedItem);
      } else {
        this.selectedItem = e.data;
      }
    }
  }

  onSelectionChanged(e) {
    this.selectedItems = e.selectedRowsData || [];
  }

  refresh() {
    this.grid.instance.refresh();
  }
}
