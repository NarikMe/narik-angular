import {
    EventAggregatorService,
    ModuleInfo,
    ModuleEventArg,
    ModuleEventType,
    ModuleManager,
    ConfigService,
    HttpService,
} from '@narik/infrastructure';
import { Subject } from 'rxjs';

import { Injectable, Injector } from '@angular/core';

import { NarikInject } from '../decorators/narik-inject.decorator';
import { NarikTranslateService } from './narik-translation.service';
import { tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class NarikModuleManager extends ModuleManager {
    readonly modules: Map<string, ModuleInfo> = new Map<string, ModuleInfo>();

    readonly modulesChanged: Observable<ModuleEventArg>;
    readonly modulesChangedSubject: Subject<ModuleEventArg>;

    private narikLoadedSubject: Subject<void>;

    get narikLoaded(): Observable<void> {
        return this.narikLoadedSubject.asObservable();
    }

    @NarikInject(EventAggregatorService)
    eventAggregatorService: EventAggregatorService;

    constructor(
        private injector: Injector,
        private httpService: HttpService,
        private configService: ConfigService,
        private translateService: NarikTranslateService
    ) {
        super();
        this.modulesChangedSubject = new Subject<ModuleEventArg>();
        this.modulesChanged = this.modulesChangedSubject.asObservable();
        this.narikLoadedSubject = new ReplaySubject(1);
    }

    private fixModuleInformation(moduleInfo?: ModuleInfo) {}

    addOrUpdateModule(key: string, moduleInfo?: ModuleInfo) {
        this.fixModuleInformation(moduleInfo);
        const isExists = this.modules.has(key);
        this.modules.set(key, moduleInfo);
        const translatePromices: Promise<boolean>[] = [];
        if (moduleInfo.metaData && moduleInfo.metaData.translateItems) {
            for (const translateItem of moduleInfo.metaData.translateItems) {
                translatePromices.push(
                    this.translateService.addTranslationItem(translateItem)
                );
            }
        }

        this.modulesChangedSubject.next({
            moduleEventType: isExists
                ? ModuleEventType.Update
                : ModuleEventType.Add,
            moduleKey: key,
            moduleInfo: moduleInfo,
        });

        Promise.all(translatePromices).then(() => {
            this.eventAggregatorService.publish('MODULE_LOAD_COMPLETELY', {
                moduleKey: key,
                moduleInfo: moduleInfo,
            });
        });
    }
    removeModule(key: string) {
        const info = this.modules.get(key);
        this.modules.delete(key);
        this.modulesChangedSubject.next({
            moduleEventType: ModuleEventType.Remove,
            moduleKey: key,
            moduleInfo: info,
        });
    }

    init(): Promise<any> {
        const moduleRootPath = this.configService.getConfig(
            'modulesMetaDataRoot'
        );
        return this.httpService
            .get(`${moduleRootPath}/narik.json`)
            .pipe(
                tap((info: ModuleInfo) => {
                    this.addOrUpdateModule('narik', info);
                    this.narikLoadedSubject.next();
                })
            )
            .toPromise();
    }
}
