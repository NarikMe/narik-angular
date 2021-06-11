import {
    MetaDataService,
    ModuleManager,
    MetaData,
    View,
    Entity,
    DataInfo,
    DefaultMetaDataKeys,
} from '@narik/infrastructure';
import { cloneDeep } from 'lodash-es';

import { isArray, isObject } from '@narik/common';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class NarikMetaDataService extends MetaDataService {
    readonly metaDataAdded: Observable<{ key: string; metaData: MetaData }>;
    readonly metaDataAddedSubject: Subject<{ key: string; metaData: MetaData }>;

    private moduleMetaDataItems = new Map<string, MetaData>();
    private mapMetaDataItems = [
        'dataItems',
        'staticData',
        'views',
        'entities',
        'toolbars',
        'uiDefaultOptions',
        'events',
    ];
    constructor(private moduleManager: ModuleManager) {
        super();

        this.metaDataAddedSubject = new Subject<{
            key: string;
            metaData: MetaData;
        }>();
        this.metaDataAdded = this.metaDataAddedSubject.asObservable();

        for (const module of this.moduleManager.modules.entriesArray()) {
            if (module.value.metaData) {
                this.manipulate(module.value.metaData);
                this.moduleMetaDataItems.set(module.key, module.value.metaData);
                this.metaDataAddedSubject.next({
                    key: module.key,
                    metaData: module.value.metaData,
                });
            }
        }
        this.moduleManager.modulesChanged.subscribe((x) => {
            if (x.moduleInfo.metaData) {
                this.manipulate(x.moduleInfo.metaData);
                this.moduleMetaDataItems.set(
                    x.moduleKey,
                    x.moduleInfo.metaData
                );
                this.metaDataAddedSubject.next({
                    key: x.moduleKey,
                    metaData: x.moduleInfo.metaData,
                });
            }
        });
    }

    protected manipulate(metaData: MetaData) {
        for (const key in metaData) {
            if (metaData.hasOwnProperty(key)) {
                const element = metaData[key];
                if (
                    this.mapMetaDataItems.indexOf(key) >= 0 ||
                    (element &&
                        isArray(element) &&
                        element[0] &&
                        isObject(element[0]) &&
                        'key' in element[0])
                ) {
                    metaData[key] = (element as Array<any>).toMap('key');
                }
            }
        }
    }

    getAllMetaData(): Map<string, MetaData> {
        return cloneDeep(this.moduleMetaDataItems);
    }
    getMetaData(moduleKey: string): MetaData {
        return cloneDeep(this.moduleMetaDataItems.get(moduleKey));
    }
    getInformation<T>(
        informationKey: string,
        moduleKey: string,
        itemKey: string
    ): T {
        const metaData = this.getMetaData(moduleKey);
        if (metaData) {
            const metaDataItem = this.getMetaData(moduleKey)[informationKey];
            return metaDataItem && metaDataItem.get
                ? metaDataItem.get(itemKey)
                : null;
        } else {
            return null;
        }
    }

    getViewInformation(moduleKey: string, itemKey: string): View {
        return this.getInformation<View>(
            DefaultMetaDataKeys.views,
            moduleKey,
            itemKey
        );
    }
    getEntityInformation(moduleKey: string, itemKey: string): Entity {
        return this.getInformation<Entity>(
            DefaultMetaDataKeys.entities,
            moduleKey,
            itemKey
        );
    }
    getDataItemInformation(moduleKey: string, itemKey: string): DataInfo {
        return this.getInformation<DataInfo>(
            DefaultMetaDataKeys.dataItems,
            moduleKey,
            itemKey
        );
    }
    getValue<T>(moduleKey: string, informationKey: string): T {
        return this.getMetaData(moduleKey)[informationKey];
    }
}
