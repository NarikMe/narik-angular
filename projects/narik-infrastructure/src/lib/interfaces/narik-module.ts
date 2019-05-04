
import { NgModuleRef } from "@angular/core";

import { DataInfo, DataUrlInfo } from "./data-info.model";
import { MetaData } from "./meta-data.model";



/**
 * Module data info
 */
export interface ModuleDataInfo {
  dataUrlInfo?: DataUrlInfo;
  defaultDataProvider?: string;
  defaultOriginDataProvider?: string;
}



/**
 * Module event type
 */
export enum ModuleEventType {
  Add,
  Remove,
  Update
}


/**
 * Module event arg
 */
export interface ModuleEventArg {
  moduleKey: string;
  moduleEventType: ModuleEventType;
  moduleInfo: ModuleInfo;
}

/**
 * Module info
 */
export interface ModuleInfo {
  metaData?: MetaData;
  module: NgModuleRef<any>;
}
