import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NarikTranslateLoader } from './translateLoader/narik-translate-loader';
import { Observable } from 'rxjs';
import { isString } from '@narik/common';
import { HttpService } from '@narik/infrastructure';

@Injectable({
    providedIn: 'root',
})
export class NarikTranslateService {
    constructor(
        private translateService: TranslateService,
        private http: HttpService
    ) {}

    instant(
        key: string | Array<string>,
        interpolateParams?: Object
    ): string | any {
        if (isString(key) && key.indexOf('_') > 0) {
            const items = (key as string).split('_');
            return items
                .map((item) =>
                    this.translateService.instant(item, interpolateParams)
                )
                .join(' ');
        }
        return this.translateService.instant(key, interpolateParams);
    }
    use(lang: string): Observable<any> {
        return this.translateService.use(lang);
    }
    setDefaultLang(lang: string): void {
        this.translateService.setDefaultLang(lang);
    }
    public addTranslationItem(
        item: string,
        reLoad: boolean = false
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const translateLoader = <NarikTranslateLoader>(
                this.translateService.currentLoader
            );
            translateLoader.addTranslationItem(item);
            if (reLoad) {
                this.translateService
                    .reloadLang(this.translateService.currentLang)
                    .subscribe((x) => {
                        this.translateService.use(
                            this.translateService.currentLang
                        );
                        resolve(true);
                    });
            } else {
                const url = translateLoader.getTranslateFilePath(
                    this.translateService.currentLang ||
                        this.translateService.defaultLang,
                    item
                );
                this.http.get(url).subscribe((result) => {
                    this.translateService.setTranslation(
                        this.translateService.currentLang ||
                            this.translateService.defaultLang,
                        result,
                        true
                    );
                    resolve(true);
                });
            }
        });
    }
}
