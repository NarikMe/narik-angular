import { DataInfo } from "@narik/infrastructure";
import { Observable } from "rxjs/internal/Observable";
import { ServerResponse } from "../interfaces/server-response.model";

export abstract class QueryService<T> {
  abstract get(info: DataInfo): Observable<ServerResponse<T>>;
  abstract getList(info: DataInfo): Observable<ServerResponse<T[]>>;
  abstract post(info: DataInfo, data: any): Observable<ServerResponse<T>>;
  abstract delete(info: DataInfo, data: any): Observable<ServerResponse<any>>;
}
