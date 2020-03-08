import { ViewContainerRef } from "@angular/core";

export function getParnetComponent<T>(viewContainerRef: ViewContainerRef): T {
  // export const PARENT = 3;
  // export const CONTEXT = 8;
  if (viewContainerRef["_lContainer"] && viewContainerRef["_lContainer"][3]) {
    return viewContainerRef["_lContainer"][3][8] as T;
  }
  return undefined;
}
