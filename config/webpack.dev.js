const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// 执行路径
console.log(path.resolve('/'));

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: path.resolve(__dirname, '../page/index.js'),
  output: {
    filename: '5.js',
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../utils'), // 要绝对路径
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: path.resolve(__dirname, '../loader/loader.js'),
        },
        include: path.resolve(__dirname, '../page/index.js'),
      },
      {
        test: /\.tsx?/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 编译es6语法 && 编译react
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: /node_moudles/,
      },
      {
        test: /(png|jpg|gif)/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../page/index.html'), // 不给模板它自己会创建一个html模板
    }),
  ],
  optimization: {
    minimizer: [
      // new TerserPlugin({
      //   parallel: true,
      //   terserOptions: {
      //     // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
      //   },
      // }),
    ],
  },
};
