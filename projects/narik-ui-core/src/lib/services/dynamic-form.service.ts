import {
  NarikViewField,
  EntityField,
  isNarikViewField
} from "narik-infrastructure";
import { Injectable } from "@angular/core";
export abstract class DynamicFormService {
  abstract initDynamicFormFields(
    fields: NarikViewField[] | EntityField[]
  ): NarikViewField[];
  abstract initDynamicFormModel(model: any): any;
  abstract createFieldsFromEntityFields(
    fields: EntityField[]
  ): NarikViewField[];
}

@Injectable()
export class NarikDynamicFormService extends DynamicFormService {
  initDynamicFormFields(
    fields: NarikViewField[] | EntityField[]
  ): NarikViewField[] {
    if (fields && fields[0] && !isNarikViewField(fields[0])) {
      fields = this.createFieldsFromEntityFields(fields as EntityField[]);
    }
    return fields as NarikViewField[];
  }
  initDynamicFormModel(model: any): any {
    return model || {};
  }
  createFieldsFromEntityFields(fields: EntityField[]): NarikViewField[] {
    return fields.map(
      (x: EntityField) =>
        <NarikViewField>{
          label: x.title || x.name,
          model: x.name,
          name: x.name,
          type: x.fieldType,
          options: x.options || {},
          dataInfo: x.dataInfo || {},
          showInList: x.showInList === undefined ? true : x.showInList,
          showInDetail: x.showInDetail === undefined ? true : x.showInDetail,
          orderInList: x.orderInList,
          orderInDetail: x.orderInDetail,
          order: x.order || 100,
          required: x.required,
          hideExpr: x.hideExpr,
          disableExpr: x.disableExpr
        }
    );
  }
}
