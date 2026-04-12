const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = (_, argv = {}) => {
    const isProduction = argv.mode === "production";

    return {
        mode: isProduction ? "production" : "development",
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
                    home: `home@${isProduction ? "/mfes/home/remoteEntry.js" : "http://localhost:3001/remoteEntry.js"}`,
                    data: `data@${isProduction ? "/mfes/data/remoteEntry.js" : "http://localhost:3002/remoteEntry.js"}`,
                    settings: `settings@${isProduction ? "/mfes/settings/remoteEntry.js" : "http://localhost:3003/remoteEntry.js"}`,
                    state: `state@${isProduction ? "/mfes/state/remoteEntry.js" : "http://localhost:3004/remoteEntry.js"}`,
                },
                shared: {
                    ...deps,
                    react: { singleton: true, eager: true, requiredVersion: deps.react },
                    "react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] },
                    zustand: { singleton: true },
                },
            }),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
            }),
        ],
    };
};
