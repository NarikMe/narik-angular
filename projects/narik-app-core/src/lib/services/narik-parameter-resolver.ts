import { NarikInject } from "narik-core";
import { ParameterResolver } from "narik-infrastructure";
import { Observable } from "rxjs/internal/Observable";

import { Injectable, Injector, Optional } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { NarikGeneralForm } from "../base/narik-general-form";
import { map } from "rxjs/internal/operators/map";
import { merge } from "rxjs/operators";

@Injectable()
export class NarikParameterResolver implements ParameterResolver {

  @NarikInject(ActivatedRoute, null)
  route: ActivatedRoute;

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
      return this.route.snapshot.params[key] || this.route.snapshot.data[key];
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
