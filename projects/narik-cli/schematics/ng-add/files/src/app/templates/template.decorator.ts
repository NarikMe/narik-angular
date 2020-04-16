import { TypeDecorator } from "@angular/core";
import { applyBaseTemplate } from "@narik/core";

export function NarikListUi() {
  const typeDecorator: TypeDecorator = <TypeDecorator>(
    // tslint:disable-next-line:no-shadowed-variable
    function TypeDecorator(cls: any) {
      return applyBaseTemplate(cls, "NarikListUi");
    }
  );
  return typeDecorator;
}

export function NarikEditUi() {
  const typeDecorator: TypeDecorator = <TypeDecorator>(
    // tslint:disable-next-line:no-shadowed-variable
    function TypeDecorator(cls: any) {
      return applyBaseTemplate(cls, "NarikEditUi");
    }
  );
  return typeDecorator;
}
