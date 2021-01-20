import { formatString, replaceString } from '@narik/common';
import {
    DataInfo,
    ModuleManager,
    RemoteDataProviderService,
    MODULE_DATA_KEY,
    ModuleDataInfo,
    MetaDataService,
    UrlCreatorService,
    HttpService,
} from '@narik/infrastructure';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { Subject } from 'rxjs';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class NarikRemoteDataProviderService extends RemoteDataProviderService {
    key = 'remote';
    order = 100;
    dayaKeyTemplate = '{0}_{1}';

    protected dataStreams: Map<string, Subject<any>> = new Map<
        string,
        Subject<any>
    >();

    private modulesDataInformation = new Map<string, ModuleDataInfo>();

    constructor(
        private httpService: HttpService,
        private injector: Injector,
        private moduleManager: ModuleManager,
        private metaDataService: MetaDataService
    ) {
        super();
        for (const module of this.moduleManager.modules.entriesArray()) {
            if (module.value.metaData && module.value.metaData.dataInfo) {
                this.addRemoteDataInfo(
                    module.key,
                    module.value.metaData.dataInfo
                );
            }
        }
        this.moduleManager.modulesChanged.subscribe((x) => {
            if (x.moduleInfo.metaData && x.moduleInfo.metaData.dataInfo) {
                this.addRemoteDataInfo(
                    x.moduleKey,
                    x.moduleInfo.metaData.dataInfo
                );
            }
        });
    }

    protected addRemoteDataInfo(moduleKey: string, dataInfo: ModuleDataInfo) {
        if (!this.modulesDataInformation.has(moduleKey)) {
            this.modulesDataInformation.set(moduleKey, dataInfo);
        }
    }

    isDataProviderFor(dataInfo: DataInfo) {
        return true;
    }

    handleData<T = any>(dataInfo: DataInfo): Observable<T> {
        let _dataUrl = dataInfo.dataUrl;
        let _remoteDataProvider = dataInfo.remoteDataProvider;
        let _parameterPrefix = '';
        if (!_dataUrl) {
            let _dataInfo = { ...dataInfo };
            if (!_dataInfo.moduleKey) {
                _dataInfo.moduleKey = this.injector.get(MODULE_DATA_KEY);
            }

            if (!dataInfo.actionType || dataInfo.actionType === 'DATA') {
                const dataItemInformations = this.metaDataService.getDataItemInformation(
                    _dataInfo.moduleKey,
                    _dataInfo.dataKey
                );
                if (dataItemInformations) {
                    _dataInfo = Object.assign(dataItemInformations, _dataInfo);
                }
            }
            const moduleDataItemInformations = this.modulesDataInformation.get(
                _dataInfo.moduleKey
            );
            if (moduleDataItemInformations) {
                if (!_dataInfo.dataUrl) {
                    const urlInfo = moduleDataItemInformations.dataUrlInfo;
                    if (
                        !dataInfo.actionType ||
                        dataInfo.actionType === 'DATA'
                    ) {
                        _dataInfo.dataUrl = urlInfo.dataPathTemplate;
                    } else if (dataInfo.actionType === 'GET') {
                        _dataInfo.dataUrl = urlInfo.getPathTemplate;
                    } else if (dataInfo.actionType === 'LIST') {
                        _dataInfo.dataUrl = urlInfo.listPathTemplate;
                    } else if (dataInfo.actionType === 'POST') {
                        _dataInfo.dataUrl = urlInfo.postPathTemplate;
                    } else if (dataInfo.actionType === 'UPDATE') {
                        _dataInfo.dataUrl = urlInfo.updatePathTemplate;
                    } else if (dataInfo.actionType === 'DELETE') {
                        _dataInfo.dataUrl = urlInfo.deletePathTemplate;
                    } else if (dataInfo.actionType === 'COMPLETE') {
                        _dataInfo.dataUrl = urlInfo.completePathTemplate;
                    } else {
                        _dataInfo.dataUrl =
                            urlInfo[dataInfo.actionType + 'PathTemplate'];
                    }

                    _parameterPrefix = urlInfo.parameterPrefix;
                    if (!_remoteDataProvider) {
                        _remoteDataProvider = urlInfo.defaultRemoteDataProvider;
                    }
                    if (
                        !_dataInfo.dataUrlMethod &&
                        (!dataInfo.actionType || dataInfo.actionType === 'DATA')
                    ) {
                        _dataInfo.dataUrlMethod = urlInfo.defaultDataUrlMethod;
                    }
                }
            }

            if (!_dataInfo.dataUrlMethod) {
                _dataInfo.dataUrlMethod = '';
            }
            _dataUrl = replaceString(
                _dataInfo.dataUrl,
                _dataInfo,
                '',
                '{',
                '}'
            );
        }

        if (
            !dataInfo.dataMethod ||
            dataInfo.dataMethod === 'GET' ||
            dataInfo.dataMethod === 'PUT'
        ) {
            _parameterPrefix = _parameterPrefix || '';
            if (dataInfo.urlParameters || dataInfo.dataParameters) {
                if (
                    _parameterPrefix &&
                    _dataUrl.indexOf(_parameterPrefix) >= 0
                ) {
                    _dataUrl = replaceString(
                        _dataUrl,
                        dataInfo.urlParameters || dataInfo.dataParameters,
                        _parameterPrefix
                    );
                } else {
                    if (!_remoteDataProvider) {
                        throw new Error(
                            'RemoteDataProvider Dos Not Determined'
                        );
                    }
                    const urlCreatorService = this.injector.get(
                        UrlCreatorService
                    );
                    _dataUrl = urlCreatorService.applyParameters(
                        _remoteDataProvider,
                        _dataUrl,
                        dataInfo.urlParameters || dataInfo.dataParameters
                    );
                }
            }

            if (dataInfo.pagingParameter) {
                const urlCreatorService = this.injector.get(UrlCreatorService);
                _dataUrl = urlCreatorService.applyPagingParameters(
                    _remoteDataProvider,
                    _dataUrl,
                    dataInfo.pagingParameter
                );
            }
        }
        if (dataInfo.dataMethod === 'POST') {
            return this.httpService.post(
                _dataUrl,
                dataInfo.dataParameters || {}
            ) as Observable<T>;
        } else if (dataInfo.dataMethod === 'DELETE') {
            return this.httpService.delete(
                _dataUrl,
                dataInfo.dataParameters || {}
            ) as Observable<T>;
        } else if (dataInfo.dataMethod === 'PUT') {
            return this.httpService.put(
                _dataUrl,
                dataInfo.dataParameters || {}
            ) as Observable<T>;
        } else {
            return this.httpService.get(_dataUrl) as Observable<T>;
        }
    }

    getDataStream<T = any>(dataInfo: DataInfo): Observable<T> {
        const fullKey = this.getFullKey(dataInfo);
        if (this.dataStreams.has(fullKey)) {
            return this.dataStreams.get(fullKey);
        } else {
            const dataSubject = new ReplaySubject<T>(1);
            this.dataStreams.set(fullKey, dataSubject);
            this.handleData(dataInfo)
                .pipe(first())
                .subscribe((data) => dataSubject.next(data));
            return dataSubject.asObservable();
        }
    }

    protected getFullKey(dataInfo: DataInfo): string {
        let moduleKey = dataInfo.moduleKey;
        if (!moduleKey) {
            moduleKey = this.injector.get(MODULE_DATA_KEY);
        }
        return formatString(this.dayaKeyTemplate, moduleKey, dataInfo.dataKey);
    }
}
