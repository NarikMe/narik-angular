import { NarikEntity } from '@narik/infrastructure';
import { NarikListForm } from '@narik/app-core';
import { OnInit, AfterViewInit, Injector } from '@angular/core';
import { MatLazyDataSource } from '../data-source/mat-lazy-data-source';
import { MatLocalDataSource } from '../data-source/mat-local-data-source';

export class NarikUiListForm<T extends NarikEntity>
    extends NarikListForm<T>
    implements OnInit, AfterViewInit {
    get isServerSide(): boolean {
        return this.config && this.config.isServerSideData ? true : false;
    }

    constructor(injector: Injector) {
        super(injector);
        this.hasDataSource = true;
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.config) {
            if (this.isServerSide) {
                this.dataSource = new MatLazyDataSource(
                    this.queryService,
                    () => this.DataInfoForGetList
                );
            } else {
                this.dataSource = new MatLocalDataSource(
                    this.queryService,
                    () => this.DataInfoForGetList
                );
            }
        }
    }
    ngAfterViewInit() {}
}
