const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.base');

// 执行路径
console.log(path.resolve('./'));

module.exports = (env) => {
  console.log(env, process.args, 'env');

  return merge(baseConfig, {
    mode: 'development',
    target: 'web', // 提高开发构建速度
    output: {
      publicPath: '/',
    },
    module: {
      rules: [
        // {
        //   test: /\.tsx?$/,
        //   use: {
        //     loader: path.resolve(__dirname, './extension/loader.js'),
        //   },
        //   include: path.resolve(__dirname, '../page/index.tsx'),
        // },
        {
          test: /\.tsx?/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    devServer: {
      port: 9000,
      hot: true,
      open: true,
      client: {
        progress: true,
      },
      // contentBase 被static替换，默认public，作用：修改serve路径
      static: './page',
      host: 'local-ip', // 域名
      onListening: (devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
  
        const port = devServer.server.address().port;
        console.log('Listening on port:', port);
      },
    },
    devtool: 'source-map',
    plugins: [
      // new BundleAnalyzerPlugin(),
  
    ],
    optimization: {
    },
  });
};
