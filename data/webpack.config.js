const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const { merge } = require('webpack-merge');
const commonConfig = require('../webpack.common.js');

module.exports = merge(commonConfig, {
    /* ... standard webpack config (entry, loaders, etc.) ... */
    output: {
        publicPath: "auto", // Crucial for Module Federation to find chunks
    },
    devServer: {
        port: 3002,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "data",
            filename: "remoteEntry.js", // This is the manifest file the Host reads
            exposes: {
                "./DataPage": "./src/Data", // The key used by the Host
            },
            shared: {
                ...deps,
                react: { singleton: true, requiredVersion: deps.react },
                "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
            },
        }),
    ]
});