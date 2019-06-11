class TemplateResolver {
  Resolve(key) {
    switch (key) {
      case "NarikListUi":
        return {
          template: "",
          templateUrl: "./src/app/templates/list-template.html"
        };
      case "NarikDetailUi":
        return {
          template: "",
          templateUrl: "./src/app/templates/detail-template.html"
        };

      default:
        break;
    }
  }
}
module.exports = TemplateResolver;
