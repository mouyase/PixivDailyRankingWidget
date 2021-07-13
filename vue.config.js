module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? 'https://cdn.jsdelivr.net/gh/mouyase/PixivDailyRankingWidget@gh-pages/' : '/',
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
