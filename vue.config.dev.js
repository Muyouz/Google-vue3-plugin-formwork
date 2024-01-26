const reloadServer = require('./ReloadServer');

const webpack = require('webpack');
module.exports = {
    configureWebpack: {
        devtool: 'source-map',
        entry: {
            background: ['./src/background/main.js', './src/reload/Background.js'],
            content: ['./src/content-scripts/main.js', './src/reload/ContentScript.js'],
        },
        plugins: [
            // ...
            new webpack.HotModuleReplacementPlugin(),
        ],
    },
    devServer: {
        https: true,
        devMiddleware: {
            // 将 bundle 写到磁盘而不是内存
            writeToDisk: true,
        },
        onBeforeSetupMiddleware(devServer) {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }
            reloadServer(devServer.app, devServer.compiler);
        }
    }
};