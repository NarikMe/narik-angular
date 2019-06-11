import { NarikEntity, PagingParameters } from "narik-infrastructure";
import { NarikListForm, ServerResponse } from "narik-app-core";
import { OnInit, AfterViewInit, Injector, ViewChild } from "@angular/core";
import { NarikInject } from "narik-core";
import { TranslateService } from "@ngx-translate/core";

export class NarikUiListForm<T extends NarikEntity> extends NarikListForm<T>
  implements OnInit, AfterViewInit {
  ds: any[] = [];

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
    }
    if (this.config) {
      if (this.isServerSide) {
        const that = this;
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
    }
  }
}
