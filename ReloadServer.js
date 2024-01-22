//参考知乎https://zhuanlan.zhihu.com/p/399937088的结果，目的是为了能监听到文件的变化，然后自动刷新浏览器
const SSEStream = require('ssestream').default;

function ReloadServer(app, compiler) {
    app.get('/reload', (req, res, next) => {
        const sseStream = new SSEStream(req);
        sseStream.pipe(res);

        let closed = false;

        const reloadPlugin = () => {
            if (!closed) {
                sseStream.write(
                    {
                        event: 'compiled successfully',
                        data: {
                            action: 'reload extension and refresh current page'
                        }
                    },
                    'utf-8',
                    (err) => {
                        if (err) {
                            console.error(err);
                        }
                    },
                );

                setTimeout(() => {
                    sseStream.unpipe(res);
                }, 100);
            }
        };

        compiler.hooks.done.tap(
            'chrome reload plugin',
            reloadPlugin
        );

        res.on('close', () => {
            closed = true;
            sseStream.unpipe(res);
        });

        next();
    });
}

module.exports = ReloadServer;