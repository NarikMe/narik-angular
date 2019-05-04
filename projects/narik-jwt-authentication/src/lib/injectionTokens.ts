import { InjectionToken } from "@angular/core";

export const TOKEN_STORAGE = new InjectionToken<"memory" | "localStorage" | "sessionStorage" | "clientStorage">(
  "TOKEN_STORAGE"
);
