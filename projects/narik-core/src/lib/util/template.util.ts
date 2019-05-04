import "reflect-metadata";

export function applyBaseTemplate(cls: any, template: string): any {
  const annotations = cls["__annotations__"];

  if (annotations) {
    for (const annotation of annotations) {
      if (annotation && annotation.hasOwnProperty("template")) {
        const parser = new DOMParser();
        const parentDoc = parser.parseFromString(template, "text/html");
        const childDoc = parser.parseFromString(
          annotation.template,
          "text/html"
        );
        const sectionItems = parentDoc.querySelectorAll("[narik-section]");
        for (let index = 0; index < sectionItems.length; index++) {
          const element = sectionItems[index];
          const sectionName = element.attributes["narik-section"].value;
          const contentItem = childDoc.querySelector(`[\\#${sectionName}]`);
          if (
            contentItem &&
            contentItem.tagName.toLowerCase() === "ng-template"
          ) {
            template = template.replace(
              `narik-section="${sectionName}"`,
              `*ngIf="false; else ${sectionName}"`
            );
          }
        }
        annotation.template = template + annotation.template;
      }
    }
  }
  return cls;
}
