import { Type } from "@angular/core";
export const DynamicForms: { [key: string]: Type<any> } = {};

export function DynamicForm(key: string) {
  return function _dynamicFormDecorator<T extends new (...args: any[]) => any>(
    constr: T
  ) {
    DynamicForms[key] = constr;
  };
}
