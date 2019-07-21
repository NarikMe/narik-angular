import {
  MetaDataService,
  ViewManagerService,
  EntityTypeService
} from "narik-infrastructure";

import { Type } from "@angular/core";
import { ViewComponentNameResolver } from "./view-component-name-resolver";
import { QueryService } from "../services/queryService";

export interface NarikAppCoreModuleConfig {
  viewManagerService?: Type<ViewManagerService>;
  metaDataService?: Type<MetaDataService>;
  viewComponentNameResolver?: Type<ViewComponentNameResolver>;
  queryService?: Type<QueryService<any>>;
  entityTypeService?: Type<EntityTypeService>;
}
