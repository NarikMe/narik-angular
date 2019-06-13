import { ModuleDataInfo } from "./narik-module";
import { DataInfo } from "./data-info.model";

/**
 * Entity
 */
export interface Entity {
  /**
   *  Key of entity
   */
  key: string;
  /**
   * Title of entity, if not set Key used as title
   */
  title?: string;

  /**
   * Entity fields
   */
  fields?: EntityField[];

  /**
   * Used whenever system want to create new instance of this entity
   */
  defaultEntity?: any;
}

/**
 * View
 */

export interface View {
  /**
   *  Key of view
   */
  key: string;

  /**
   * Title of view, if not set Key used as title
   */
  title?: string;

  /**
   * Related entity key.
   */
  entity?: string;

  /**
   * Type of view like `List` , `Detail` and ...
   */
  viewType?: ViewTypes;

  /**
   * Fields for view, if not set, fields of related entity is used
   */
  fields?: EntityField[];

  /**
   * Used when you want to exclude some fileds from related entity fields
   */
  excludedFields?: string[];


  /**
   * Related component to this view, if not set system uses dynamic component
   */
  component?: string;


  /**
   * Initial data for view component
   */
  data?: any;


  /**
   * Used for list view, whether data loads lazy or not.
   */
  isServerSideData?: boolean;

  /**
   * key of toolbar that should load into view
   */
  toolbarKey?: string;


  /**
   * Used for list view, if isServerSideData is true
   */
  pagingInfo?: IPagingInfo;


  /**
   * Used for list view, when you want to customize data load url.
   */
  listDataInfo?: DataInfo;


  /**
   *  Used for list view, custom commands for grid.
   */
  rowCommands?: ListRowCommand[];

   /**
   *  Used for list view, how custom commans should be displayed `Menu` | `Flat`.
   */
  rowCommandType?: "Menu" | "Flat";

  /**
   * Any other options for view
   */
  options: any;
}


/**
 * List row command
 */
export interface ListRowCommand {
  commandKey: string;
  label?: string;
  title?: string;
  icon?: string;
}


/**
 * Ipaging info
 */
export interface IPagingInfo {
  availablePageSizes: number[];
  pageSize: number;
  options?: any;
}


/**
 * Event info
 */
export interface EventInfo {
  eventType: string;
  info: { subjectType: string; subjectParam: any };
}


/**
 * Entity field
 */
export interface EntityField {
  name: string;
  title?: string;
  required?: boolean;
  fieldType?: FieldTypes;
  showInList?: boolean;
  showInDetail?: boolean;
  order?: number;
  orderInList?: number;
  orderInDetail?: number;
  dataInfo?: DataInfo;
  options?: any;
  hideExpr?: string;
  disableExpr?: string;
  validators?: string[];
  validatorParams?: any;
}


/**
 * Meta data
 */
export abstract class MetaData {
  dataInfo?: ModuleDataInfo;
  translateItems?: string[];
}


/**
 * View types
 */
export enum ViewTypes {
  List = "List",
  Detail = "Detail",
  General = "General"
}


/**
 * Field types
 */
export enum FieldTypes {
  Text = "text",
  Number = "number",
  Boolean = "boolean",
  Select = "select",
  Radio = "radio",
  TextArea = "textArea",
}
