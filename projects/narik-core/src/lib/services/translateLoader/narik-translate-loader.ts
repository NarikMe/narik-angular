import { ConfigService, HttpService } from '@narik/infrastructure';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

export class NarikTranslateLoader implements TranslateLoader {
  private root = '';

  constructor(
    private http: HttpService,
    private configService: ConfigService,
    private items: string[] = []
  ) {}

  private slash = '/';
  public getTranslation(lang: string): any {
    if (this.root) {
      return this.getTranslationInternal(lang);
    } else {
      return new Observable((observer) => {
        this.configService.configLoaded.pipe(first()).subscribe(() => {
          this.root = this.configService.getConfig('translationsPath');
          this.getTranslationInternal(lang).subscribe((x) => observer.next(x));
        });
      });
    }
  }

  private getTranslationInternal(lang: string): Observable<any> {
    if (this.items.length !== 0) {
      const loaders: any[] = this.items.map((x) => {
        return this.http.get(
          `${this.root}${this.slash}${lang}${this.slash}${x}.json`
        );
      });
      return new Observable((observer) => {
        forkJoin(loaders).subscribe((translations) => {
          let result = {};
          translations.map((x) => (result = Object.assign(result, x)));
          observer.next(result);
        });
      });
    } else {
      return of({});
    }
  }

  public addTranslationItem(item: string) {
    this.items.push(item);
  }

  public getTranslateFilePath(lang: string, item: string) {
    return `${this.root}${this.slash}${lang}${this.slash}${item}.json`;
  }
}
