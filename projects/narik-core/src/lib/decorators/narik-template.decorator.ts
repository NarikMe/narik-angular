import { TypeDecorator } from "@angular/core";
import { applyBaseTemplate } from "../util/template.util";


export function NarikBaseTemplate(
  template:
    | string
    | {
        baseTemplateKey?: string;
        baseTemplateUrl?: string;
      }
) {
  const templateKey =
    typeof template === "string"
      ? template
      : template.baseTemplateKey || template.baseTemplateUrl;
  const typeDecorator: TypeDecorator = <TypeDecorator>(
    // tslint:disable-next-line:no-shadowed-variable
    function TypeDecorator(cls: any) {
      return applyBaseTemplate(cls, templateKey);
    }
  );
  return typeDecorator;
}
