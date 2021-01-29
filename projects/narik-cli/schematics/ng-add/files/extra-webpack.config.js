const path = require('path');
const AngularCompilerPlugin = require('@ngtools/webpack/src');
const LayoutResolver = require('./build-tools/layout-resolver');

module.exports = (config) => {
    const index = config.plugins.findIndex((p) => {
        return p instanceof AngularCompilerPlugin.ivy.AngularWebpackPlugin;
    });
    const oldOptions = config.plugins[index].pluginOptions;
    oldOptions.directTemplateLoading = false;
    config.plugins.splice(index);

    config.plugins.push(
        new AngularCompilerPlugin.ivy.AngularWebpackPlugin(oldOptions)
    );

    config.module.rules.unshift({
        test: /\.html?$/,
        use: [
            'raw-loader',
            {
                loader: '@narik/webpack-tools',
                options: {
                    resolver: new LayoutResolver(),
                    basePath: path.dirname(oldOptions.tsconfig),
                },
            },
        ],
    });

    return config;
};
