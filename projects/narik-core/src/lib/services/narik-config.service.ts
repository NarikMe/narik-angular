import { ConfigService, CONFIG_PATH } from "narik-infrastructure";
import { NarikHttpService } from "./narik-http.service";
import { Inject, Injectable } from "@angular/core";
import { tap } from "rxjs/internal/operators/tap";
import { Subject } from "rxjs/internal/Subject";
import { Observable } from "rxjs/internal/Observable";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";

@Injectable()
export class NarikConfigService extends ConfigService {
  configData: any = {};
  configKeys: string[] = [];
  private configLoadedSubject: Subject<any>;

  constructor(
    private httpService: NarikHttpService,
    @Inject(CONFIG_PATH) private configPath: string
  ) {
    super();
    this.configLoadedSubject = new ReplaySubject(1);
  }

  get configLoaded(): Observable<any> {
    return this.configLoadedSubject.asObservable();
  }
  init(): Promise<any> {
    return this.httpService
      .get(this.configPath)
      .pipe(
        tap(x => {
          this.configData = x;
          for (const key in x) {
            if (x.hasOwnProperty(key)) {
              this.configKeys.push(key);
            }
          }
          this.configLoadedSubject.next(true);
        })
      )
      .toPromise();
  }
  getConfig<T>(key: string): T {
    return this.configData[key] as T;
  }
  getAllKeys(): string[] {
    return this.configKeys;
  }
}
