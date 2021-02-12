const path = require('path');
const AngularCompilerPlugin = require('@ngtools/webpack/src');
const LayoutResolver = require('./build-tools/layout-resolver');

module.exports = (config) => {
    const index = config.plugins.findIndex((p) => {
        return p instanceof AngularCompilerPlugin.ivy.AngularWebpackPlugin;
    });
    const options = config.plugins[index].pluginOptions;
    options.directTemplateLoading = false;
    config.plugins.splice(index, 1);

    config.plugins.push(
        new AngularCompilerPlugin.ivy.AngularWebpackPlugin(options)
    );

    config.module.rules.unshift({
        test: /\.html?$/,
        use: [
            'raw-loader',
            {
                loader: '@narik/webpack-tools',
                options: {
                    resolver: new LayoutResolver(),
                    basePath: path.dirname(options.tsconfig),
                },
            },
        ],
    });

    return config;
};
