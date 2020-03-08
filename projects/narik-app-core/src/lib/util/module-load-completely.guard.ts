import {
  EventAggregatorService
} from "@narik/infrastructure";
import { Observable } from "rxjs";
import { Observer } from "rxjs";

import { Inject, Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { filter } from "rxjs/operators";
import { first } from "rxjs/operators";

@Injectable()
export class ModuleLoadCompletelyGuard implements CanActivate {
  constructor(
     private eventAggregatorService: EventAggregatorService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const moduleKey = route.data["moduleKey"];
    return Observable.create((observer: Observer<any>) => {
      this.eventAggregatorService
        .listen<{ moduleKey: string }>("MODULE_LOAD_COMPLETELY")
        .pipe(
          filter(x => x.moduleKey === moduleKey),
          first()
        )
        .subscribe(() => {
          observer.next(true);
        });
    });
  }
}
