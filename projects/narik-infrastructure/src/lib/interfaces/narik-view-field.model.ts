import { DataInfo } from "./data-info.model";



/**
 * Narik view field
 */
export interface NarikViewField {
  model: string;
  name?: string;
  type?: string;
  label?: string;
  dataInfo?: DataInfo;
  options?: any;
  showInList?: boolean;
  showInDetail?: boolean;
  order?: number;
  orderInList?: number;
  orderInDetail?: number;
  required?: boolean;
  hideExpr?: string;
  disableExpr?: string;
}


/**
 * Determines whether narik view field is
 * @param obj  object that should be checked
 * @returns  obj is NarikViewField
 */
export function isNarikViewField(obj: any) {
  return "model" in obj;
}
