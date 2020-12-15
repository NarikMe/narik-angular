import { InjectionToken } from '@angular/core';
import { GlobalConfig } from 'ngx-toastr';

export const LOCAL_STORAGE_VALIDITY_LEN = new InjectionToken<number>(
  'LOCAL_STORAGE_VALIDITY_LEN'
);
export const SESSION_STORAGE_VALIDITY_LEN = new InjectionToken<number>(
  'SESSION_STORAGE_VALIDITY_LEN'
);

export const MEMORY_STORAGE_VALIDITY_LEN = new InjectionToken<number>(
  'MEMORY_STORAGE_VALIDITY_LEN'
);
export const TOASTR_OPTION = new InjectionToken<Partial<GlobalConfig>>(
  'TOSTR_OPTION'
);
