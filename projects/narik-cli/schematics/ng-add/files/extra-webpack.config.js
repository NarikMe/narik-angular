const path = require("path");
const AngularCompilerPlugin = require("@ngtools/webpack/src");
const LayoutResolver = require("./build-tools/layout-resolver");

module.exports = (config) => {
  const index = config.plugins.findIndex((p) => {
    return p instanceof AngularCompilerPlugin.AngularCompilerPlugin;
  });
  const oldOptions = config.plugins[index]._options;
  oldOptions.directTemplateLoading = false;
  config.plugins.splice(index);

  config.plugins.push(
    new AngularCompilerPlugin.AngularCompilerPlugin(oldOptions)
  );

  config.module.rules.unshift({
    test: /\.html?$/,
    use: [
      "raw-loader",
      {
        loader: "@narik/webpack-tools",
        options: {
          resolver: new LayoutResolver(),
          basePath: config.plugins[index]._basePath,
        },
      },
    ],
  });

  return config;
};
