import { NarikInject } from "@narik/core";
import { ParameterResolver } from "@narik/infrastructure";
import { Observable } from "rxjs";

import { Injectable, Injector, Optional } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { NarikGeneralForm } from "../base/narik-general-form";
import { map } from "rxjs/operators";
import { merge } from "rxjs/operators";

@Injectable()
export class NarikParameterResolver implements ParameterResolver {
  @NarikInject(ActivatedRoute, null)
  route: ActivatedRoute;

  @NarikInject(Router, null)
  router: Router;

  constructor(
    private injector: Injector,
    private formComponent: NarikGeneralForm<any>
  ) {}
  get(key: any) {
    if (
      this.formComponent.parameters &&
      this.formComponent.parameters.hasOwnProperty(key)
    ) {
      return this.formComponent.parameters[key];
    }
    if (this.route) {
      let value =
        this.route.snapshot.params[key] || this.route.snapshot.data[key];
      if (value) {
        return value;
      }
      if (this.route.snapshot.queryParams) {
        value = this.route.snapshot.queryParams[key];
        if (+value) {
          return +value;
        }
      }
    }
    if (this.router) {
      if ((this.router as any).transitions._value) {
        const extras = (this.router as any).transitions._value.extras;
        if (extras && extras.data) {
          return extras.data[key];
        }
      }
    }
  }
  listen<T>(key: any): Observable<T> {
    if (this.route) {
      return this.route.params.pipe(
        map(params => params[key]),
        merge(this.route.data.pipe(map(dataItem => dataItem[key])))
      );
    }
  }
}
