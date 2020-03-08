var NarikCompilerPlugin = require("@narik/webpack-tools/narik-compiler-plugin");
var TemplateResolver = require("./build-tools/template-resolver");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "@narik/webpack-tools",
            options: {
              resolver: new TemplateResolver()
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new NarikCompilerPlugin({
      decoratorPattern: new RegExp(/Ui$/),
      resolver: new TemplateResolver({})
    })
  ]
};
