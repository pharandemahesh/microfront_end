const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const { merge } = require('webpack-merge');
const commonConfig = require('../webpack.common.js');

module.exports = merge(commonConfig, {
    output: {
        publicPath: "auto",
    },
    devServer: {
        port: 3003,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "settings",
            filename: "remoteEntry.js", // This is the manifest file the Host reads
            exposes: {
                "./SettingsPage": "./src/Settings", // The key used by the Host
            },
            shared: {
                ...deps,
                react: { singleton: true, requiredVersion: deps.react },
                "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
            },
        }),
    ],
});