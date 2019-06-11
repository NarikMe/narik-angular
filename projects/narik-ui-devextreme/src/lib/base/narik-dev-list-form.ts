import { NarikDevDataTable } from "../narik-dev-data-table/narik-dev-data-table.component";
import { NarikEntity, PagingParameters } from "narik-infrastructure";
import { NarikListForm, ServerResponse } from "narik-app-core";
import { OnInit, AfterViewInit, Injector, ViewChild } from "@angular/core";
import { NarikInject } from "narik-core";
import { TranslateService } from "@ngx-translate/core";

import { DevLazyDataSource } from "../data-source/dev-lazy-data-source";

export class NarikUiListForm<T extends NarikEntity> extends NarikListForm<T>
  implements OnInit, AfterViewInit {
  ds: any[] = [];
  devFields: any[] = [];

  @ViewChild(NarikDevDataTable, { static: false })
  grid: NarikDevDataTable;

  @NarikInject(TranslateService)
  translateService: TranslateService;

  get isServerSide(): boolean {
    return this.config && this.config.isServerSideData ? true : false;
  }

  constructor(injector: Injector) {
    super(injector);
    this.hasDataSource = false;
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.fields) {
      this.devFields = this.fields.map(f => {
        return {
          caption: this.translateService.instant(f.label),
          dataField: f.name,
          dataType: f.type,
          format: f.options.format
        };
      });
    }
    if (this.config) {
      if (this.isServerSide) {
        const that = this;
        this.dataSource = new DevLazyDataSource(
          this.queryService,
          () => this.DataInfoForGetList
        );
      }
    }
  }
  ngAfterViewInit() {}

  useData(result: ServerResponse<any[]>) {
    this.dataSource = <any>result.data;
  }

  protected refresh(remoteDaraParams?: PagingParameters) {
    if (!this.isServerSide) {
      this.getEntities();
    } else {
      this.grid.refresh();
    }
  }
}
