import { ComponentFactory } from '@angular/core';
import { isString } from './string.util';

export function isEquivalent(obj1, obj2, ignoreCase = false): boolean {
  if (!obj1 && !obj2) {
    return true;
  }
  if ((obj1 && !obj2) || (obj2 && !obj1)) {
    return false;
  }

  if (
    (obj1.constructor && !obj2.constructor) ||
    (obj2.constructor && !obj1.constructor) ||
    obj1.constructor.name !== obj2.constructor.name
  ) {
    return false;
  }

  return ignoreCase
    ? JSON.stringify(obj1).toLowerCase() === JSON.stringify(obj2).toLowerCase()
    : JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function isObject(value) {
  return typeof value === 'object';
}
export function isPresent(value) {
  return value !== null && value !== undefined;
}

export function isBlank(value) {
  return value === null || value === undefined;
}

export function isDate(value) {
  return value && value.getTime;
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isArray(value) {
  return Array.isArray(value);
}

export function toDtoArray(
  data: any[],
  valueField?: string,
  displayFiled?: string
): { id: any; title: any }[] {
  return data.map((x) => {
    return isString(x)
      ? {
          id: x,
          title: x,
        }
      : {
          id: x[valueField],
          title: x[displayFiled],
        };
  });
}

export function getNestedValue(obj: any, path: string) {
  if (!obj || !path) {
    return null;
  }
  for (const item of path.split('.')) {
    if (item) {
      obj = obj[item];
    }
  }
  return obj;
}
