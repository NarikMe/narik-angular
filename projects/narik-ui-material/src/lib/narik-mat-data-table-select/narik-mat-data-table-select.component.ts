import { isEquivalent } from "narik-common";
import {
  NarikDataSource,
  DataInfo,
  DataOption,
  DataProviderService
} from "narik-infrastructure";
import {
  NARIK_DATA_DISPLAY_VALUE_INPUTS,
  NARIK_DATA_DISPLAY_VALUE_OUTPUTS,
  NARIK_DATA_TABLE_SELECT_INPUTS
} from "narik-ui-core";

import { Observable } from "rxjs/internal/Observable";

import {
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { NarikMatDataTableSelectBase } from "../base/narik-mat-data-table-select-base";
import { NARIK_MAT_FORM_INPUTS } from "../base/narik-mat-form-field";
import { NarikMatDataTable } from "../narik-mat-data-table/narik-mat-data-table.component";
import { MatLocalDataSource } from "../data-source/mat-local-data-source";
import { MatLazyDataSource } from "../data-source/mat-lazy-data-source";

@Component({
  selector: "narik-mat-data-table-select , narik-data-table-select",
  templateUrl: "narik-mat-data-table-select.component.html",
  styleUrls: ["narik-mat-data-table-select.component.css"],
  inputs: [
    ...NARIK_MAT_FORM_INPUTS,
    ...NARIK_DATA_DISPLAY_VALUE_INPUTS,
    ...NARIK_DATA_TABLE_SELECT_INPUTS
  ],
  outputs: [...NARIK_DATA_DISPLAY_VALUE_OUTPUTS],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NarikMatDataTableSelect),
      multi: true
    }
  ]
})
export class NarikMatDataTableSelect extends NarikMatDataTableSelectBase
  implements OnInit {
  gridOptions = {
    showSearchPanel: false
  };

  _selectMode: "Click" | "DblClick" = "Click";
  set selectMode(value: "Click" | "DblClick") {
    this._selectMode = value;
  }
  get selectMode(): "Click" | "DblClick" {
    return this._selectMode;
  }

  @ViewChild(MatAutocompleteTrigger)
  autoComplete: MatAutocompleteTrigger;

  @ViewChild(NarikMatDataTable)
  dataTable: NarikMatDataTable;

  @ViewChild("input")
  input: ElementRef;

  @Input()
  isLazyLoadData = true;

  @Input()
  displayText: string;

  @Input()
  allowType = false;

  get gridSelectMode(): "None" | "One" | "Multiple" {
    return this.multiple ? "Multiple" : "None";
  }

  _selectedItem: any;

  set selectedItem(value: any) {
    if (!isEquivalent(value, this._selectedItem)) {
      if (value) {
        this.value = value[this.valueField];
        this.input.nativeElement.value = value[this.displayField];
      } else {
        this.value = undefined;
        this.input.nativeElement.value = "";
      }

      this._selectedItem = value;
    }
  }
  get selectedItem(): any {
    return this._selectedItem;
  }

  tableDataSource: NarikDataSource<any>;
  optionData: any[] = [];

  _fields: any[];

  @Input()
  set fields(value: any[]) {
    this._fields = value;
  }
  get fields(): any[] {
    return (
      this._fields || [
        {
          label: "title",
          model: "title",
          name: "title",
          options: {},
          type: "text"
        }
      ]
    );
  }

  gridPagingInfo: any;
  filteredData: Observable<any[]>;

  constructor(
    injector: Injector,
    private dataProviderService: DataProviderService
  ) {
    super(injector);
  }

  protected detectChanges() {}

  protected useData(data: any[]) {
    this.optionData = data;
    (this.tableDataSource as MatLocalDataSource<any>).setData(data);
    this.setDisplayText();
  }

  ngOnInit() {
    this.loadDataOnInit = !this.isLazyLoadData;
    this.gridPagingInfo = this.isLazyLoadData
      ? {
          pageSize: 20,
          availablePageSizes: [10, 20, 50, 100]
        }
      : undefined;
    if (this.isLazyLoadData) {
      this.tableDataSource = new MatLazyDataSource(
        undefined,
        () => this.createDataInfo(),
        this.dataProviderService
      );
    } else {
      this.tableDataSource = new MatLocalDataSource(undefined, undefined);
    }
    super.ngOnInit();
    this.detectChanges();
  }

  protected valueChanged(newValue: any, oldValue: any): void {
    super.valueChanged(newValue, oldValue);
    if (newValue !== oldValue) {
      this.setDisplayText();
    }
    this.detectChanges();
  }

  openPanel() {
    if (!this.allowType) {
      this.autoComplete.openPanel();
    }
  }
  rowDblClick(data) {
    if (this.selectMode === "DblClick") {
      this.selectedItem = data;
      this.autoComplete.closePanel();
    }
  }
  rowSelect(data) {
    if (this.selectMode === "Click") {
      this.selectedItem = data;
      this.autoComplete.closePanel();
    }
  }

  keyUp(key) {
    if (key.keyCode !== 13) {
      const filter = this.input.nativeElement.value;

      this.dataTable.applyFilter(filter);

      if (!this.input.nativeElement.value && !this.required) {
        this.value = undefined;
      }
    }
  }

  setDisplayText() {
    if (this.value) {
      const data = this.tableDataSource.currentData;
      const item = data.filter(x => x[this.valueField] === this.value)[0];
      this.input.nativeElement.value = item
        ? item[this.displayField]
        : this.displayText || "";
    } else {
      this.input.nativeElement.value = "";
    }
  }

  onBlur() {
    if (!this.isLazyLoadData) {
      this.setDisplayText();
    }
  }
  protected doLoadData(
    dataInfo: DataInfo,
    dataOption: DataOption,
    listenForDataChange: boolean
  ): Observable<any[]> {
    if (this.isLazyLoadData) {
      this.tableDataSource.loadData();
    } else {
      return super.doLoadData(dataInfo, dataOption, listenForDataChange);
    }
  }
}