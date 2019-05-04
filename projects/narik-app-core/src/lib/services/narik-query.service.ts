import { Injector, Injectable } from "@angular/core";
import { NarikInject } from "narik-core";
import {
  DataInfo,
  MODULE_DATA_KEY,
  RemoteCallMethodType,
  DataActionType,
  RemoteDataProviderService
} from "narik-infrastructure";
import { Observable } from "rxjs/internal/Observable";

import { ServerResponse } from "../interfaces/server-response.model";
import { map } from "rxjs/internal/operators/map";
import { QueryService } from "./queryService";

@Injectable()
export class NarikQueryService<T> extends QueryService<T> {
  @NarikInject(MODULE_DATA_KEY)
  moduleDataKey: string;

  @NarikInject(RemoteDataProviderService)
  remoteDataProvider: RemoteDataProviderService;

  constructor(private injector: Injector) {
    super();
  }

  get(info: DataInfo): Observable<ServerResponse<T>> {
    info.actionType = info.actionType || "GET";
    this.completeDataInfo(info);
    return this.remoteDataProvider
      .getData(info)
      .pipe(
        map(
          result =>
            this.convertResultToServerResponseData(
              result,
              info.actionType
            ) as ServerResponse<T>
        )
      );
  }
  getList(info: DataInfo): Observable<ServerResponse<T[]>> {
    info.actionType = info.actionType || "LIST";
    this.completeDataInfo(info);
    return this.remoteDataProvider
      .getData(info)
      .pipe(
        map(
          result =>
            this.convertResultToServerResponseData(
              result,
              info.actionType
            ) as ServerResponse<T[]>
        )
      );
  }
  post(info: DataInfo, data: any): Observable<ServerResponse<T>> {
    info.actionType = info.actionType || "POST";
    info.dataMethod =
      info.dataMethod || (info.actionType === "UPDATE" ? "PUT" : "POST");
    this.completeDataInfo(info);
    this.completePostDataInfo(info, data);
    return this.remoteDataProvider
      .getData(info)
      .pipe(
        map(
          result =>
            this.convertResultToServerResponseData(
              result,
              info.actionType
            ) as ServerResponse<T>
        )
      );
  }
  delete(info: DataInfo, data: any): Observable<ServerResponse<any>> {
    info.actionType = info.actionType || "DELETE";
    this.completeDataInfo(info);
    this.completePostDataInfo(info, data);
    info.dataMethod = "POST";
    return this.remoteDataProvider
      .getData(info)
      .pipe(
        map(
          result =>
            this.convertResultToServerResponseData(
              result,
              info.actionType
            ) as ServerResponse<T>
        )
      );
  }

  protected completeDataInfo(info: DataInfo) {
    info.moduleKey = info.moduleKey || this.moduleDataKey;
    info.dataProviderKey = info.dataProviderKey || "remote";
  }
  protected completePostDataInfo(info: DataInfo, data: any) {
    info.dataMethod = info.dataMethod || <RemoteCallMethodType>info.actionType;
    info.dataParameters = this.customizeDataOnPost(data, info.actionType);
  }

  protected convertResultToServerResponseData(
    result: any,
    actionType: DataActionType
  ): ServerResponse<T> | ServerResponse<T[]> {
    if (actionType === "LIST" && result.hasOwnProperty("count")) {
      return {
        data: result.result,
        count: result.count
      };
    } else {
      return {
        data: result
      };
    }
  }

  customizeDataOnPost(data: any, actionType: DataActionType): any {
    return data;
  }
}
