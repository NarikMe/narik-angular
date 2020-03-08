import { isEquivalent } from "@narik/common";
import { NarikInject } from "@narik/core";
import {
  CommandInfo,
  NarikDataSource,
  NarikEntity,
  NavigationService,
  IPagingInfo,
  PagingParameters,
  NarikViewField,
  DialogRef,
  DialogResult,
  DialogService,
  DataInfo,
  ConfigService,
  MetaDataService,
  MODULE_UI_KEY
} from "@narik/infrastructure";
import { DynamicFormService } from "@narik/ui-core";
import { takeWhile, filter, finalize } from "rxjs/operators";

import { Injector, OnInit } from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";

import {
  DEFAULT_PAGING_INFO,
  LIST_DEFAULT_VIEW_OPTION
} from "../injectionTokens";
import { ListFormConfig } from "../interfaces/form-config.model";
import {
  DefaultListViewOption,
  ListFormViewOption
} from "../interfaces/form-view-option.model";
import { ServerResponse } from "../interfaces/server-response.model";
import { StringConstants } from "../util/constants";
import { NarikGeneralForm } from "./narik-general-form";

/**
 * Narik list form
 */
export abstract class NarikListForm<TE extends NarikEntity>
  extends NarikGeneralForm<TE>
  implements OnInit {
  _entities: TE[] = [];
  _dataSource: NarikDataSource<TE>;
  _dataParameters: any;
  fields: NarikViewField[];
  _selectedEntity: TE;
  _config: ListFormConfig;
  _selectedItems: any[];
  viewOptions: any;
  defaultNavigationProvider = "route";

  protected entityKeyField: string;

  @NarikInject(ConfigService)
  configService: ConfigService;

  @NarikInject(DialogService)
  dialogService: DialogService;

  @NarikInject(ActivatedRoute)
  route: ActivatedRoute;

  @NarikInject(NavigationService)
  navigationService: NavigationService;

  @NarikInject(DynamicFormService)
  dynamicFormService: DynamicFormService;

  @NarikInject(MetaDataService)
  metaDataService: MetaDataService;

  @NarikInject(MODULE_UI_KEY)
  moduleKey: string;

  @NarikInject(DEFAULT_PAGING_INFO, {
    pageSize: 20,
    availablePageSizes: [10, 20, 50, 100]
  })
  defaultPagingInfo: IPagingInfo;

  _hasDataSource: boolean;

  set hasDataSource(value: boolean) {
    this._hasDataSource = value;
  }
  get hasDataSource(): boolean {
    return this._hasDataSource || !!this.dataSource;
  }

  set dataParameters(value: any) {
    this._dataParameters = value;
  }
  get dataParameters(): any {
    return this._dataParameters;
  }

  set dataSource(value: NarikDataSource<TE>) {
    this._dataSource = value;
    this.detectChanges();
  }
  get dataSource(): NarikDataSource<TE> {
    return this._dataSource;
  }

  set entities(value: TE[]) {
    this._entities = value;
    this.entitiesChanged();
    this.detectChanges();
  }
  get entities(): TE[] {
    return this._entities;
  }

  set config(value: ListFormConfig) {
    this.manipulateConfig(value);
    this._config = value;
  }
  get config(): ListFormConfig {
    return this._config;
  }

  @NarikInject(LIST_DEFAULT_VIEW_OPTION, DefaultListViewOption)
  defaultViewOption: ListFormViewOption;

  set selectedItems(value: any[]) {
    this._selectedItems = value;
  }
  get selectedItems(): any[] {
    return this._selectedItems;
  }

  set selectedEntity(value: TE) {
    if (!isEquivalent(this._selectedEntity, value)) {
      const oldValue = this._selectedEntity;
      this._selectedEntity = value;
      this.selectedEntityChanged(oldValue, value);
      this.detectChanges();
    }
  }
  get selectedEntity(): TE {
    return this._selectedEntity;
  }

  protected get DataInfoForGetList(): DataInfo {
    if (this.config.listDataInfo) {
      this.config.listDataInfo.dataKey =
        this.config.listDataInfo.dataKey || this.config.entityKey;
      return this.config.listDataInfo;
    }
    return {
      dataKey: this.config.entityKey
    };
  }

  constructor(injector: Injector) {
    super(injector);
    this.entityKeyField =
      this.configService.getConfig("entityKeyField") || "viewModelId";

    this.viewOptions = this.metaDataService.getValue<any>(
      this.moduleKey,
      "viewOptions"
    );
  }

  ngOnInit() {
    this.config =
      this.config ||
      this.parameterResolver.get(StringConstants.Prameter_Config);
    if (this.config && this.config.isDynamic) {
      this.fields = this.dynamicFormService
        .createFieldsFromEntityFields(this.config.fields)
        .filter(x => x.showInList)
        .sort(function(obj1, obj2) {
          return (
            (obj1.orderInList || obj1.order) - (obj2.orderInList || obj2.order)
          );
        });
    }
    if (!this.config.isServerSideData) {
      if (this.dataSource && this.config.bindIsBusyToDataSourceBusy) {
        this._dataSource.loadingObservable
          .pipe(takeWhile(x => this.isAlive))
          .subscribe(isBusy => (this.isBusy = isBusy));
      }

      if (!this.dataSource && !this.hasDataSource) {
        this.getEntities();
      }
    }
    this.detectChanges();
  }

  getEntities() {
    this.isBusy = true;
    const dataInfo = this.DataInfoForGetList;
    this.queryService
      .getList(dataInfo)
      .pipe(finalize(() => (this.isBusy = false)))
      .subscribe((result: ServerResponse<TE[]>) => {
        this.useData(result);
      });
  }

  protected selectedEntityChanged(oldValue: TE, newValue: TE) {}
  protected entitiesChanged() {}
  protected manipulateConfig(config: ListFormConfig) {
    if (config) {
      config.pagingInfo =
        config.pagingInfo ||
        (config.isServerSideData
          ? {
              pageSize: this.defaultPagingInfo.pageSize,
              availablePageSizes: this.defaultPagingInfo.availablePageSizes
            }
          : undefined);
      if (config.pagingInfo) {
        (config.pagingInfo.pageSize =
          config.pagingInfo.pageSize || this.defaultPagingInfo.pageSize),
          (config.pagingInfo.availablePageSizes =
            config.pagingInfo.availablePageSizes ||
            this.defaultPagingInfo.availablePageSizes);
      }
    }
  }
  protected useData(result: ServerResponse<TE[]>) {
    this.entities = result.data;
  }

  protected refresh(remoteDaraParams?: PagingParameters) {
    if (!this.dataSource) {
      this.getEntities();
    } else {
      this.dataSource.loadData();
    }
  }

  protected getDetailViewKey(entity: TE): string {
    return this.config.entityKey;
  }
  public editEntity(entity: TE) {
    if (this.config.allowEdit === false || this.config.readOnly) {
      return;
    }
    this.newOrEditEntity(entity);
  }
  protected newOrEditEntity(selectedEntity?: TE) {
    const navigationType = this.getDetailNavigationProvider();

    if (this.config.readOnly) {
      return;
    }
    if (this.config.allowNew === false && !selectedEntity) {
      return;
    }
    const data = selectedEntity
      ? {
          entityId: selectedEntity[this.entityKeyField]
        }
      : {};
    data["__dialogTitle"] = this.config.entityKey;

    this.navigationService
      .navigate(
        this.navigationService.createNavigationCommand(
          this.defaultNavigationProvider,
          this.getDetailViewKey(selectedEntity)
        ),
        navigationType,
        {
          relativeTo: this.route,
          queryParams: selectedEntity
            ? { entityId: selectedEntity[this.entityKeyField] }
            : {}
        },
        data
      )
      .then((d: DialogRef<any>) => {
        if (d.events) {
          d.events
            .pipe(filter(x => x.eventType === "ENTITY_UPDATED"))
            .subscribe(x => {
              this.refresh();
            });
        }
      });
  }

  protected deleteEntities() {
    if (this.config.allowDelete === false || this.config.readOnly) {
      return;
    }
    if (this.selectedItems && this.selectedItems.length !== 0) {
      this.dialogService
        .showConfirm("info.delete-confirm", "info.confirm")
        .closed.then((confirmResult: DialogResult<any>) => {
          if (confirmResult.dialogResult === "yes") {
            this.isBusy = true;
            const data = this.selectedItems.map(x => {
              return {
                id: x[this.entityKeyField]
              };
            });
            this.queryService
              .delete({ dataKey: this.config.entityKey }, { items: data })
              .pipe(
                finalize(() => {
                  this.isBusy = false;
                })
              )
              .subscribe(x => {
                this.refresh();
              });
          }
        });
    }
  }

  rowCommandClick(info: { key: string; item: any }) {
    this.processCommand({
      commandKey: info.key,
      commandData: {
        row: info.item
      }
    });
  }
  processCommand(cmd: CommandInfo) {
    switch (cmd.commandKey) {
      case "refresh":
        this.refresh();
        break;
      case "edit":
        if (this.selectedEntity) {
          this.newOrEditEntity(this.selectedEntity);
        }
        break;
      case "new":
        this.newOrEditEntity();
        break;
      case "delete":
        this.deleteEntities();
        break;
      default:
        super.processCommand(cmd);
        break;
    }
  }
  protected getDetailNavigationProvider() {
    if (
      this.config &&
      this.config.options &&
      this.config.options.detailNavigationProvider
    ) {
      return this.config.options.detailNavigationProvider === "dialog"
        ? "dialog"
        : this.defaultNavigationProvider;
    }

    if (this.viewOptions) {
      return this.viewOptions.detailNavigationProvider === "dialog"
        ? "dialog"
        : this.defaultNavigationProvider;
    }

    return "dialog";
  }
}
