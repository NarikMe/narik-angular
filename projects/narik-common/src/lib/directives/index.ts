import { Provider } from "@angular/core";
import { ComponentLoaderHostDirective } from "./component-loader-host.directive";
import { NarikComponentLoaderDirective } from "./component-loader.directive";
import { TabGuardDirective } from "./tab-guard.directive";
import { AutoFocusDirective } from "./auto-focus.directive";

export const DIRECTIVES: Provider[] = [
  ComponentLoaderHostDirective,
  NarikComponentLoaderDirective,
  TabGuardDirective,
  AutoFocusDirective
];
export const EXPORT_DIRECTIVES: Provider[] = [
  ComponentLoaderHostDirective,
  NarikComponentLoaderDirective,
  TabGuardDirective,
  AutoFocusDirective
];
