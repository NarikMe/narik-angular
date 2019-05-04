import { InjectionToken } from "@angular/core";
import { NarikSignalRConfig } from "./base/narik-signalR.config";

export const SIGNALR_CONFIG = new InjectionToken<NarikSignalRConfig>(
  "SIGNALR_CONFIG"
);
