const path = require('path');
const { merge } = require('webpack-merge');
// https://webpack.docschina.org/guides/output-management/#the-manifest
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  /*
  * 如未使用 browserslist，webpack 的运行时代码将默认使用 ES2015 语法（例如，箭头函数）来构建一个简洁的 bundles。设置 target: ['web', 'es5'] 以使用 ES5 的语法。 
  */
  target: ['web', 'es5'],
  devtool: false, // 防止打包是使用eval模式
  plugins: [
    new WebpackManifestPlugin({
      fileName: 'c',
    }),
  ],
  optimization: {
    runtimeChunk: 'single', // 提取webpack 运行时
  },
});
