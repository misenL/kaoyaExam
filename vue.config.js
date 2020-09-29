// const userJson = require('./mock/test.json')
// const cashList = require('./mock/widthdrawlist.json')
const path = require('path')
module.exports = {
  // publicPath: './',
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'source-map'
      // mutate config for production...
    } 
  },
  css: {
    loaderOptions: {
      stylus: {
        import: path.resolve(__dirname, 'src/main.styl')
        // 'resolve url': true,
        // 'import': [
        //   './src/theme'
        // ]
      }
    }
  },
  devServer: {
    port: 8081,
    disableHostCheck: true,
    // host: 'nodejs.huikaoedu.com',
    // mock 测试
    // before (app) {
    //   app.get('/api/biz/withdrawlist', (req, res, next) => {
    //     res.json(cashList)
    //   }),
    //   app.get('/user/list', (req, res, next) => {
    //     res.json(userJson)
    //   })
    // }
  }
}
