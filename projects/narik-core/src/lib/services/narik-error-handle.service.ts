import { Injectable, Inject, inject } from "@angular/core";
import {
  ErrorHandleService,
  ErrorHandler,
} from "@narik/infrastructure";
import { groupBy } from "@narik/common";

@Injectable()
export class NarikErrorHandleService extends ErrorHandleService {
  private errorHandlers = new Map<string, ErrorHandler[]>();

  constructor(@Inject(ErrorHandler) handles: ErrorHandler[]) {
    super();
    const data = groupBy(handles, "key");
    data.forEach(x => this.errorHandlers.set(x.key, x.value));
  }

  HandleError(errorTypeKey: string, err: any): boolean {
    const handlers = this.errorHandlers
      .get(errorTypeKey)
      .sort(x => x.order);
    let handled = false;
    for (const x of handlers) {
      handled = x.HandleError(err);
      if (handled) {
        return true;
      }
    }
    return handled;
  }
}
