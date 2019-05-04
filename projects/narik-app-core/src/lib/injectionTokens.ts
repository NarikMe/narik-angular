import { ParameterResolver, IPagingInfo } from "narik-infrastructure";

import { InjectionToken } from "@angular/core";

import {
  DetailFormViewOption,
  ListFormViewOption
} from "./interfaces/form-view-option.model";

export const DETAIL_DEFAULT_VIEW_OPTION = new InjectionToken<
  DetailFormViewOption
>("DetailDefaultOption");
export const LIST_DEFAULT_VIEW_OPTION = new InjectionToken<ListFormViewOption>(
  "ListDefaultOption"
);
export const PARAMETER_RESOLVER = new InjectionToken<ParameterResolver>(
  "ParameterResolver"
);

export const DEFAULT_PAGING_INFO = new InjectionToken<IPagingInfo>(
  "Defaukt Paging Info"
);
