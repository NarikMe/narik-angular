import {
    NarikComponent,
    MetaDataService,
    MODULE_UI_KEY,
} from '@narik/infrastructure';

import { Input, Injector, Directive } from '@angular/core';
import { NarikInject } from '@narik/core';

@Directive()
export class NarikUiComponent extends NarikComponent {
    _options: any = {};
    _defaultOptions = {};

    get uiKey(): string {
        return undefined;
    }

    @NarikInject(MetaDataService)
    metaDataService: MetaDataService;

    @NarikInject(MODULE_UI_KEY)
    containerModuleKey: string;

    @Input()
    set options(value: any) {
        this._options = this.applyDefaultOptions(value);
    }
    get options(): any {
        return this._options;
    }

    get DefaultOptions(): any {
        return this._defaultOptions || {};
    }
    constructor(protected injector: Injector) {
        super();
        if (this.uiKey) {
            const dfOptions = this.metaDataService.getInformation<any>(
                'uiDefaultOptions',
                this.containerModuleKey,
                this.uiKey
            );
            if (dfOptions) {
                this._defaultOptions = dfOptions.value;
                this._options = this.applyDefaultOptions(undefined);
            }
        } else {
            this._options = {};
        }
    }

    protected applyDefaultOptions(value: any) {
        const defOptions = this.DefaultOptions || {};
        if (!value) {
            return { ...defOptions };
        } else {
            return Object.assign({ ...defOptions }, value || {});
        }
    }
}

export const NARIK_UI_COMPONENT_INPUTS: string[] = ['options'];
