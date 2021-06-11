import { SwimlaneLazyDataSource } from './../data-source/swimlane-lazy-data-source';
import { NarikEntity, PagingParameters } from '@narik/infrastructure';
import { NarikListForm, ServerResponse } from '@narik/app-core';
import { OnInit, AfterViewInit, Injector, Directive } from '@angular/core';
import { NarikInject } from '@narik/core';
import { TranslateService } from '@ngx-translate/core';

@Directive()
export class NarikUiListForm<T extends NarikEntity>
    extends NarikListForm<T>
    implements OnInit, AfterViewInit {
    swimlaneFields: any[] = [];

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
            this.swimlaneFields = this.fields.map((f) => {
                return {
                    name: this.translateService.instant(f.label),
                    prop: f.name,
                    type: f.type,
                    options: f.options,
                };
            });
        }
        if (this.config) {
            if (this.isServerSide) {
                this.dataSource = new SwimlaneLazyDataSource(
                    this.queryService,
                    () => this.DataInfoForGetList
                );
                this.dataSource.loadingObservable.subscribe(
                    (x) => (this.isBusy = x)
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
            this.dataSource.loadData();
        }
    }
}
