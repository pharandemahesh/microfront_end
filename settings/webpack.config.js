const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const { merge } = require('webpack-merge');
const commonConfig = require('../webpack.common.js');

module.exports = (_, argv = {}) => {
    const isProduction = argv.mode === "production";

    return merge(commonConfig, {
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
                filename: "remoteEntry.js",
                remotes: {
                    state: `state@${isProduction ? "/mfes/state/remoteEntry.js" : "http://localhost:3004/remoteEntry.js"}`,
                },
                exposes: {
                    "./SettingsPage": "./src/Settings",
                },
                shared: {
                    ...deps,
                    react: { singleton: true, requiredVersion: deps.react },
                    "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
                    zustand: { singleton: true },
                },
            }),
        ],
    });
};
