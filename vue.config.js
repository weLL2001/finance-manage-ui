const { defineConfig } = require('@vue/cli-service')
module.exports = {
  ...defineConfig({
    transpileDependencies: true
  }),
  /*devServer:{
    open:true,
    host:'127.0.0.1'
  }, */
  //configureWebpack 属性配置对象会和默认cli配置合并
  //chainWebpack 属性配置对象可以进行链式操作

  configureWebpack:{
    devServer:{
      open:true,
      host:'127.0.0.1',
      proxy:{
        '/api':{
          target:"http://1.116.64.64:5004",
          logProvide:console,
          logLevel:'debug'
        }
      }
    }
  }
}