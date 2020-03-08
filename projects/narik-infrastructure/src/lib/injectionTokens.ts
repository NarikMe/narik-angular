import { Observable } from "rxjs";
import { InjectionToken, Type } from "@angular/core";

import {
  DialogContainer,
  DialogOverlayContainer,
  DialogRef,
  DialogInputContent
} from "./services/DialogService";
import { DataProvider } from "./services/DataProvider";
import { DataStorage } from "./services/DataStorage";
import { ConfigOptions } from "./services/ConfigService";

// ِDialog Items
export const DIALOG_MESSAGE_COMPONENT = new InjectionToken<Type<any>>(
  "DIALOG_MESSAGE_COMPONENT"
);
export const DIALOG_INPUT_COMPONENT = new InjectionToken<
  Type<DialogInputContent>
>("DIALOG_INPUT_COMPONENT");
export const DIALOG_CONTENT_COMPONENT = new InjectionToken<Type<any>>(
  "DIALOG_CONTENT_COMPONENT"
);

// Navigation
export const DIALOG_CONTAINER = new InjectionToken<Type<DialogContainer>>(
  "DialogContainer"
);
export const DIALOG_OVERLAY_CONTAINER = new InjectionToken<
  Type<DialogOverlayContainer>
>("DialogOverlayContainer");

export const DIALOG_REF = new InjectionToken<DialogRef<any>>("Dialog Ref");

export const DATA_PROVIDER = new InjectionToken<DataProvider>("DataProvider");
export const DATA_STORAGE = new InjectionToken<DataStorage>("DataStorage");

export const DEFAULT_DATA_STORAGE_KEY = new InjectionToken<string>(
  "DefaultDataStorageKey"
);

export const IS_LOGIN_GUARD = new InjectionToken<() => Observable<Boolean>>(
  "IS_LOGIN_GUARD"
);

export const MODULE_DATA_KEY = new InjectionToken<string>("ModuleDataKey");
export const MODULE_UI_KEY = new InjectionToken<string>("ModuleUiKey");

export const DEFAULT_LANG = new InjectionToken<string>("DefaultLang");
export const USE_DEFAULT_LANG = new InjectionToken<string>("UseDefaultLang");

export const AUTHENTICATION_LOGIN_END_POINT = new InjectionToken<string>(
  "AUTHENTICATION_END_POINT"
);
export const AUTHENTICATION_LOGOUT_END_POINT = new InjectionToken<string>(
  "AUTHENTICATION_END_POINT"
);
export const AUTHENTICATION_REFRESH_END_POINT = new InjectionToken<string>(
  "AUTHENTICATION_REFRESH_END_POINT"
);
export const LOGIN_PAGE_URL = new InjectionToken<string>("LOGIN_PAGE_URL");
export const CONFIG_PATH = new InjectionToken<string>("CONFIG_PATH");
export const CONFIG_OPTIONS = new InjectionToken<ConfigOptions>(
  "CONFIG_OPTIONS"
);
