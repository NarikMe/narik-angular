import {
  EntityField,
  IPagingInfo,
  DataInfo,
  ListRowCommand
} from "narik-infrastructure";

export interface FormConfig {
  title?: string;
  fields?: EntityField[];
  isDynamic: boolean;
  toolbarKey?: string;
  options?: any;
  readOnly?: boolean;
  allowEdit?: boolean;
  allowNew?: boolean;
  allowDelete?: boolean;
}

export interface DetailFormConfig extends FormConfig {
  entityKey: string;
  entityTypeCreator?: string;
  defaultEntity?: any;
}

export interface ListFormConfig extends FormConfig {
  entityKey: string;
  pagingInfo: IPagingInfo;
  isServerSideData: boolean;
  bindIsBusyToDataSourceBusy: boolean;
  listDataInfo?: DataInfo;
  rowCommands?: ListRowCommand[];
  rowCommandType?: "Menu" | "Flat";
}
