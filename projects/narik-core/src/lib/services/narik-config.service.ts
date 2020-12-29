import {
  ConfigService,
  CONFIG_PATH,
  CONFIG_OPTIONS,
  ConfigOptions,
  HttpService,
} from '@narik/infrastructure';

import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class NarikConfigService extends ConfigService {
  configData: any = {};
  configKeys: string[] = [];
  private configLoadedSubject: Subject<any>;

  constructor(
    private httpService: HttpService,
    @Inject(CONFIG_OPTIONS) private configOptions: ConfigOptions,
    @Inject(CONFIG_PATH) private configPath: string
  ) {
    super();

    if (configOptions && configOptions.configFilePath) {
      this.configPath = configOptions.configFilePath;
    }
    this.configLoadedSubject = new ReplaySubject(1);
  }

  get configLoaded(): Observable<any> {
    return this.configLoadedSubject.asObservable();
  }
  init(): Promise<any> {
    return this.httpService
      .get(
        this.configPath +
          (this.configOptions &&
          this.configOptions.addTimeParameterToConfigFilePath
            ? '?t=' + new Date().getTime()
            : '')
      )
      .pipe(
        tap((x) => {
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
