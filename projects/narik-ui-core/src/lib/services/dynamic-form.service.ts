import {
  NarikViewField,
  EntityField,
  isNarikViewField
} from "@narik/infrastructure";
import { Injectable, Type } from "@angular/core";

export interface DynamicFormComponent {
  field: NarikViewField | EntityField;
  model: any;
}
export abstract class DynamicFormService {
  abstract initDynamicFormFields(
    fields: NarikViewField[] | EntityField[]
  ): NarikViewField[];
  abstract initDynamicFormModel(model: any): any;
  abstract createFieldsFromEntityFields(
    fields: EntityField[]
  ): NarikViewField[];
  abstract getDynamicFormComponentKeys(): string[];
  abstract getDynamicFormComponent(key: string): Type<DynamicFormComponent>;
  abstract addDynamicFormComponent(
    key: string,
    component: Type<DynamicFormComponent>
  );
}

@Injectable()
export class NarikDynamicFormService extends DynamicFormService {
  private dynamicFormComponent: Map<
    string,
    Type<DynamicFormComponent>
  > = new Map<string, Type<DynamicFormComponent>>();

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
          showInEdit: x.showInEdit === undefined ? true : x.showInEdit,
          orderInList: x.orderInList,
          orderInEdit: x.orderInEdit,
          order: x.order || 100,
          required: x.required,
          hideExpr: x.hideExpr,
          disableExpr: x.disableExpr,
          validators: x.validators,
          validatorParams: x.validatorParams
        }
    );
  }

  getDynamicFormComponentKeys(): string[] {
    return this.dynamicFormComponent.keysArray();
  }
  getDynamicFormComponent(key: string): Type<DynamicFormComponent> {
    return this.dynamicFormComponent.get(key);
  }
  addDynamicFormComponent(key: string, component: Type<DynamicFormComponent>) {
    this.dynamicFormComponent.set(key, component);
  }
}
