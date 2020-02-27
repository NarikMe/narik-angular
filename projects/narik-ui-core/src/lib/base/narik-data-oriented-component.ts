import { Observable } from "rxjs";
import { Input, OnInit, Injector, Output, EventEmitter } from "@angular/core";
import { isEquivalent } from "@narik/common";
import {
  DataInfo,
  RemoteCallMethodType,
  MODULE_DATA_KEY,
  DataProviderService,
  DataOption
} from "@narik/infrastructure";

import { takeWhile } from "rxjs/internal/operators/takeWhile";
import {
  NarikFormComponent,
  NARIK_UI_FORM_INPUTS
} from "./narik-form-component";

export abstract class NarikDataOrientedComponent extends NarikFormComponent
  implements OnInit {
  private initDataDone = false;
  _dataUrl: string;
  _dataKey: string;
  _dataProviderKey: string;
  _dataParameters: any;
  _moduleKey: string;
  _dataMethod: RemoteCallMethodType;
  _dataUrlMethod: string;
  _listenForDataChange = false;
  _dataInfo: DataInfo;
  _dataSource: any[];
  _dataIsLoading: boolean;

  @Input()
  loadDataOnInit = true;

  @Output()
  dataChange = new EventEmitter<any>();

  @Output()
  selectedItemChange = new EventEmitter<any>();

  set dataIsLoading(value: boolean) {
    this._dataIsLoading = value;
  }
  get dataIsLoading(): boolean {
    return this._dataIsLoading;
  }

  @Input()
  set listenForDataChange(value: boolean) {
    this._listenForDataChange = value;
  }
  get listenForDataChange(): boolean {
    return this._listenForDataChange;
  }

  @Input()
  set dataUrlMethod(value: string) {
    if (value !== this._dataUrlMethod) {
      this._dataUrlMethod = value;
      this.checkIfNeedLoadData();
    }
  }
  get dataUrlMethod(): string {
    return this._dataUrlMethod;
  }

  @Input()
  set dataMethod(value: RemoteCallMethodType) {
    if (value !== this._dataMethod) {
      this._dataMethod = value;
      this.checkIfNeedLoadData();
    }
  }
  get dataMethod(): RemoteCallMethodType {
    return this._dataMethod;
  }

  @Input()
  set moduleKey(value: string) {
    if (value !== this._moduleKey) {
      this._moduleKey = value;
      this.checkIfNeedLoadData();
    }
  }
  get moduleKey(): string {
    return this._moduleKey;
  }

  @Input()
  set dataParameters(value: any) {
    if (!isEquivalent(value, this._dataParameters)) {
      this._dataParameters = value;
      this.checkIfNeedLoadData();
    }
  }
  get dataParameters(): any {
    return this._dataParameters;
  }

  @Input()
  set dataProviderKey(value: string) {
    if (value !== this._dataProviderKey) {
      this._dataProviderKey = value;
      this.checkIfNeedLoadData();
    }
  }
  get dataProviderKey(): string {
    return this._dataProviderKey;
  }

  @Input()
  set dataInfo(value: DataInfo) {
    if (!isEquivalent(value, this._dataInfo)) {
      this._dataInfo = value;
      this.checkIfNeedLoadData();
    }
  }
  get dataInfo(): DataInfo {
    return this._dataInfo;
  }

  @Input()
  set dataKey(value: string) {
    if (value !== this.dataKey) {
      this._dataKey = value;
      this.checkIfNeedLoadData();
    }
  }
  get dataKey(): string {
    return this._dataKey;
  }

  @Input()
  set dataUrl(value: string) {
    if (value !== this._dataUrl) {
      this._dataUrl = value;
      this.checkIfNeedLoadData();
    }
  }
  get dataUrl(): string {
    return this._dataUrl;
  }

  @Input()
  set dataSource(value: any[]) {
    this._dataSource = value;
    this.useData(value);
    this.dataChange.emit(value);
  }

  get dataSource(): any[] {
    return this._dataSource;
  }

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.loadDataOnInit) {
      this.loadData(this.createDataInfo());
    }
  }

  private applyData(
    data: any[],
    resolve: (value?: any[] | PromiseLike<any[]>) => void
  ) {
    this.dataSource = data;
    this.dataIsLoading = false;
    this.initDataDone = true;
    resolve(data);
  }
  protected abstract useData(data: any[]);
  protected checkIfNeedLoadData() {
    if (this.initDataDone) {
      this.loadData(this.createDataInfo());
    }
  }

  protected createDataInfo(): DataInfo {
    if (this.dataInfo) {
      return this.dataInfo;
    } else {
      return {
        dataKey: this.dataKey,
        dataProviderKey: this.dataProviderKey,
        dataUrl: this.dataUrl,
        dataParameters: this.dataParameters,
        dataMethod: this.dataMethod,
        dataUrlMethod: this.dataUrlMethod
      };
    }
  }

  protected isDataParametersComplete(dataInfo: DataInfo): boolean {
    if (dataInfo.dataParameters) {
      for (const key in dataInfo.dataParameters) {
        if (dataInfo.dataParameters.hasOwnProperty(key)) {
          const element = dataInfo.dataParameters[key];
          if (element === undefined) {
            return false;
          }
        }
      }
    }
    return true;
  }
  protected loadData(dataInfo: DataInfo, isReload = false): Promise<any[]> {
    if (dataInfo.dataKey) {
      if (!dataInfo.moduleKey) {
        dataInfo.moduleKey = this.injector.get(MODULE_DATA_KEY);
      }
      return new Promise((resolve, reject) => {
        if (!this.isDataParametersComplete(dataInfo)) {
          this.applyData([], resolve);
        } else {
          this.dataIsLoading = true;
          this.doLoadData(
            dataInfo,
            { fromOrigin: isReload },
            this.listenForDataChange
          )
            .pipe(takeWhile(() => this.isAlive))
            .subscribe((data: any[]) => {
              this.applyData(data, resolve);
            });
        }
      });
    }
  }

  protected doLoadData(
    dataInfo: DataInfo,
    dataOption: DataOption,
    listenForDataChange: boolean
  ): Observable<any[]> {
    const dataProviderService = this.injector.get(DataProviderService);
    if (listenForDataChange) {
      return dataProviderService.getDataStream(dataInfo, dataOption);
    } else {
      return dataProviderService.getData(dataInfo, dataOption);
    }
  }

  reLoadData(): Promise<any[]> {
    return this.loadData(this.createDataInfo(), true);
  }
}

export const NARIK_DATA_ORIENTED_OUTPUTS: string[] = [
  "dataChange",
  "selectedItemChange"
];

export const NARIK_DATA_ORIENTED_INPUTS: string[] = [
  "listenForDataChange",
  "dataSource",
  "dataKey",
  "dataUrl",
  "dataInfo",
  "dataProviderKey",
  "dataParameters",
  "moduleKey",
  "dataMethod",
  "dataUrlMethod",
  ...NARIK_UI_FORM_INPUTS
];
