class TemplateResolver {
  Resolve(key) {
    switch (key) {
      case "NarikListUi":
        return {
          template: "",
          templateUrl: "./src/app/templates/list-template.html"
        };
      case "NarikEditUi":
        return {
          template: "",
          templateUrl: "./src/app/templates/edit-template.html"
        };

      default:
        break;
    }
  }
}
module.exports = TemplateResolver;
