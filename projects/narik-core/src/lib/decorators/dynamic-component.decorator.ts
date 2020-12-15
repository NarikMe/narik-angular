import { Type } from '@angular/core';
export const DynamicComponents: { [key: string]: Type<any> } = {};

export function DynamicComponent(key: string) {
  return function _dynamicFormDecorator<T extends new (...args: any[]) => any>(
    constr: T
  ) {
    DynamicComponents[key] = constr;
  };
}
