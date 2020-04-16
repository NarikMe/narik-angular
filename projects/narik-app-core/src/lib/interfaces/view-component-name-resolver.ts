import { Injectable } from "@angular/core";
import { formatString } from "@narik/common";
import { View, ViewTypes } from "@narik/infrastructure";

export abstract class ViewComponentNameResolver {
  abstract resolveComponentName(view: View): string;
}

@Injectable()
export class NarikViewComponentNameResolver extends ViewComponentNameResolver {
  resolveComponentName(view: View): string {
    if (!view.component) {
      switch (view.viewType) {
        case ViewTypes.Edit:
          return "GeneralEditComponent";
        case ViewTypes.List:
          return "GeneralListComponent";
        case ViewTypes.General:
          return "";
        default:
          break;
      }
    } else if (view.component === "*") {
      switch (view.viewType) {
        case ViewTypes.Edit:
          return formatString("{0}EditComponent", view.entity);
        case ViewTypes.List:
          return formatString("{0}ListComponent", view.entity);
        case ViewTypes.General:
          return formatString("{0}Component", view.entity);
        default:
          break;
      }
    } else {
      return view.component;
    }
  }
}
