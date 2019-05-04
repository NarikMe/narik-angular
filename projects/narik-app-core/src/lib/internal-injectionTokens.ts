import { InjectionToken, Type } from "@angular/core";
import { QueryService } from "./services/queryService";

export const QUERY_SERVICE_TYPE = new InjectionToken<Type<QueryService<any>>>(
  "QUERY_SERVICE_TYPE"
);
