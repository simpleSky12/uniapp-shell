const path = require('path')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('~', resolve("node_modules"))
  },
  devServer: {
    port: 8000
   /* proxy: {
      '/api': {
        target: 'http://demo.lost.com',
        changeOrigin: true,
        pathRewrite: {
          '/api': '/api'
        }
      }
    }*/
  }
}

