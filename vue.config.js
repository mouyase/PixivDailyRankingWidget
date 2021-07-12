module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Pixiv 每日排行榜小部件'
                return args
            })
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'https://cloud.mokeyjay.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
