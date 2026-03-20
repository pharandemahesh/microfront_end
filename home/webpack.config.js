const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const { merge } = require('webpack-merge');
const commonConfig = require('../webpack.common.js');

module.exports = merge(commonConfig, {
    output: {
        publicPath: "auto",
    },
    devServer: {
        port: 3001,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "home", // Fixed trailing space
            filename: "remoteEntry.js",
            exposes: {
                "./HomePage": "./src/Home",
            },
            shared: {
                ...deps,
                react: { singleton: true, requiredVersion: deps.react },
                "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
            },
        }),
    ],
});