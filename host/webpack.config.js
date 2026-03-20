const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
    mode: "development",
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        rootMode: "upward",
                    },
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "host",
            remotes: {
                // Format: "internalName@URL/filename"
                home: "home@http://localhost:3001/remoteEntry.js",
                data: "data@http://localhost:3002/remoteEntry.js",
                settings: "settings@http://localhost:3003/remoteEntry.js",
            },
            shared: {
                ...deps,
                react: { singleton: true, eager: true, requiredVersion: deps.react },
                "react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
