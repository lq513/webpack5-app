const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
// https://webpack.docschina.org/guides/output-management/#the-manifest
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const baseConfig = require('./webpack.base');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// baseConfig.module.rules[1].use[1].options.modules.localIdentName = '[hash:base64]';

module.exports = merge(baseConfig, {
  mode: 'production',
  /*
  * 如未使用 browserslist，webpack 的运行时代码将默认使用 ES2015 语法（例如，箭头函数）来构建一个简洁的 bundles。设置 target: ['web', 'es5'] 以使用 ES5 的语法。 
  */
  target: ['web', 'es5'],
  devtool: false, // 防止打包是使用eval模式
  module: {
    rules: [
      {
        test: /\.(t|j)sx?/,
        // use: 'awesome-typescript-loader',
        use: ['babel-loader'],
        exclude: /node_modules/,
        // sideEffects: false,
      },
    ],
  },
  plugins: [
    new WebpackManifestPlugin(),
    new webpack.DefinePlugin({
      $DEV: 'false',
    }),
  ],
  optimization: {
    // runtimeChunk: 'single', // 提取webpack 运行时
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          // cacheGroupKey here is `commons` as the key of the cacheGroup
          name(module, chunks, cacheGroupKey) {
            // console.log(module.identifier(), 22222);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return 'vendor';
          },
          chunks: 'all',
        },
      },
    },
    // 压缩代码
    minimizer: [
      // new TerserPlugin({
      //   parallel: true,
      //   terserOptions: {
      //     // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
      //   },
      // }),
      '...', // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
      new CssMinimizerPlugin(), // webpack@4中使用optimize-css-assets-webpack-plugin
    ],
  },
});
