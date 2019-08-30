module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 8088,
        // 不设置代理时，直接看页面  接入后台加代理 不能直接访问页面
        // // 设置代理
        proxy: {
            '/': {
                // 目标IP 后台
                // target: 'http://192.168.30.74:9998/',
                target: 'http://192.168.61.47:8080/',
                ws: false,
                changeOrigin: true
            }
        }
    },
    productionSourceMap: false,
    configureWebpack: {
        performance: {
            maxEntrypointSize: 400000,
            maxAssetSize: 30000000
        }
    }
    // assetsDir: './',
}