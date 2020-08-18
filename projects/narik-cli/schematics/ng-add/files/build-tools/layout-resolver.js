class LayoutResolver {
  Resolve(key) {
    switch (key) {
      case "NarikListUi":
        return {
          layout: "",
          layoutUrl: "./src/app/layouts/list-layout.html"
        };
      case "NarikEditUi":
        return {
          layout: "",
          layoutUrl: "./src/app/layouts/edit-layout.html"
        };

      default:
        break;
    }
  }
}
module.exports = LayoutResolver;
