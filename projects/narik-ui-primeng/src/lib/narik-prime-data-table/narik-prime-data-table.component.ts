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
  selector: "narik-prime-data-table , narik-data-table",
  templateUrl: "narik-prime-data-table.component.html"
})
export class NarikPrimeDataTable extends NarikDataTable {
  constructor(
    injector: Injector,
    private changeDetector: ChangeDetectorRef,
    @Inject(DOCUMENT) private document
  ) {
    super(injector);
  }
}
