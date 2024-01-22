const reloadServer = require('./ReloadServer');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        lazy: false,
        // 将 bundle 写到磁盘而不是内存
        writeToDisk: true,
        before(app, serve, compiler) {
            reloadServer(app, compiler);
        }
    }
};