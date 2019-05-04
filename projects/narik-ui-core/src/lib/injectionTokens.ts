import { InjectionToken } from "@angular/core";

import { ValueDisplayDefaultFieldNames } from "./interfaces/select-default-fields.model";
import { ButtonDefaultOptions } from "./interfaces/button-default-options";

export const DEFAULT_VALUE_DISPLAY_FIELD_NAMES = new InjectionToken<ValueDisplayDefaultFieldNames>("DefaultValueDisplayFieldNames");
export const BUTTON_DEFAULT_OPTIONS = new InjectionToken<ButtonDefaultOptions>("ButtonDefaultOptions");
