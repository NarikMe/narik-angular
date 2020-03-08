import { NarikEntity, PagingParameters } from "@narik/infrastructure";
import { NarikListForm, ServerResponse } from "@narik/app-core";
import { OnInit, AfterViewInit, Injector } from "@angular/core";
import { NarikInject } from "@narik/core";
import { TranslateService } from "@ngx-translate/core";
import { PrimeLazyDataSource } from "../data-source/prime-lazy-data-source";

export class NarikUiListForm<T extends NarikEntity> extends NarikListForm<T>
  implements OnInit, AfterViewInit {
  primeFields: any[] = [];

  @NarikInject(TranslateService)
  translateService: TranslateService;

  get isServerSide(): boolean {
    return this.config && this.config.isServerSideData ? true : false;
  }

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.fields) {
      this.primeFields = this.fields.map(f => {
        return {
          header: this.translateService.instant(f.label),
          field: f.name,
          type: f.type,
          options: f.options
        };
      });
    }
    if (this.config) {
      if (this.isServerSide) {
        this.dataSource = new PrimeLazyDataSource(
          this.queryService,
          () => this.DataInfoForGetList
        );
        this.dataSource.loadingObservable.subscribe(x => (this.isBusy = x));
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
      this.dataSource.loadData();
    }
  }
}
