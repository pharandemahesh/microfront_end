const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const { merge } = require('webpack-merge');
const commonConfig = require('../webpack.common.js');

module.exports = merge(commonConfig, {
    output: {
        publicPath: "auto",
    },
    devServer: {
        port: 3004,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "state",
            filename: "remoteEntry.js",
            exposes: {
                "./store": "./src/store",
            },
            shared: {
                ...deps,
                react: { singleton: true, requiredVersion: deps.react },
                zustand: { singleton: true }
            },
        }),
    ],
});
