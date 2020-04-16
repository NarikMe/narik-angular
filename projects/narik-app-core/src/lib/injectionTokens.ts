import { ParameterResolver, IPagingInfo } from "@narik/infrastructure";

import { InjectionToken } from "@angular/core";

import {
  EditFormViewOption,
  ListFormViewOption
} from "./interfaces/form-view-option.model";

export const EDIT_DEFAULT_VIEW_OPTION = new InjectionToken<
  EditFormViewOption
>("EditDefaultOption");
export const LIST_DEFAULT_VIEW_OPTION = new InjectionToken<ListFormViewOption>(
  "ListDefaultOption"
);
export const PARAMETER_RESOLVER = new InjectionToken<ParameterResolver>(
  "ParameterResolver"
);

export const DEFAULT_PAGING_INFO = new InjectionToken<IPagingInfo>(
  "Defaukt Paging Info"
);
