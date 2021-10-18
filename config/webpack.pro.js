const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: false, // 防止打包是使用eval模式
  plugins: [
  ],
});
