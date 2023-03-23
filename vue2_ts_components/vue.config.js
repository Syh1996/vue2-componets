const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: config =>{
    config.resolve.alias
    .set('@Components',path.resolve(__dirname,'./src/components'))
    .set('@lang',path.resolve(__dirname,'./src/lang'))
    .set('@less',path.resolve(__dirname,'./src/less'))
  },
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  }
})
