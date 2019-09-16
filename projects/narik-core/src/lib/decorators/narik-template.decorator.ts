import { TypeDecorator } from "@angular/core";
import { applyBaseTemplate } from "../util/template.util";

export function NarikBaseTemplate(templateKey: string) {
  const typeDecorator: TypeDecorator = <TypeDecorator>(
    // tslint:disable-next-line:no-shadowed-variable
    function TypeDecorator(cls: any) {
      return applyBaseTemplate(cls, templateKey);
    }
  );
  return typeDecorator;
}
