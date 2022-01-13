const path = require('path');
const AngularCompilerPlugin = require('@ngtools/webpack/src');
const LayoutResolver = require('./build-tools/layout-resolver');

module.exports = (config) => {
  const index = config.plugins.findIndex((p) => {
    return p instanceof AngularCompilerPlugin.AngularWebpackPlugin;
  });
  const options = config.plugins[index].pluginOptions;
  options.directTemplateLoading = false;
  config.plugins.splice(
    index,
    1,
    new AngularCompilerPlugin.AngularWebpackPlugin(options)
  );
  config.module.rules.unshift(
    {
      test: /\.html$/i,
      use: [
        {
          loader: '@narik/webpack-tools',
          options: {
            resolver: new LayoutResolver(),
            basePath: path.dirname(options.tsconfig),
          },
        },
      ],
    },
    {
      test: /\.html$/i,
      type: 'asset/source',
    }
  );

  return config;
};
