import { ConfigService } from "@narik/infrastructure";
import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { first } from "rxjs/internal/operators/first";
import { Observable } from "rxjs/internal/Observable";
import { forkJoin } from "rxjs/internal/observable/forkJoin";
import { of } from "rxjs/internal/observable/of";

export class NarikTranslateLoader implements TranslateLoader {
  private root = "";

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private items: string[] = []
  ) {}

  private slash = "/";
  public getTranslation(lang: string): any {
    if (this.root) {
      return this.getTranslationInternal(lang);
    } else {
      return Observable.create(observer => {
        this.configService.configLoaded.pipe(first()).subscribe(() => {
          this.root = this.configService.getConfig("translationsPath");
          this.getTranslationInternal(lang).subscribe(x => observer.next(x));
        });
      });
    }
  }

  private getTranslationInternal(lang: string): Observable<any> {
    if (this.items.length !== 0) {
      const loaders: any[] = this.items.map(x => {
        return this.http.get(
          `${this.root}${this.slash}${lang}${this.slash}${x}.json`
        );
      });
      return Observable.create(observer => {
        forkJoin(loaders).subscribe(trnslations => {
          let result = {};
          trnslations.map(x => (result = Object.assign(result, x)));
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
