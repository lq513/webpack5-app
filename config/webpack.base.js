const path = require('path');
// const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Plugin = require('./extension/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackbar = require('webpackbar');

module.exports = {
  // context: path.resolve(__dirname, '../page'),
  // 设置缓存位置
  cache: {
    type: 'filesystem',
    // cacheDirectory 默认路径是 node_modules/.cache/webpack
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),
  },
  entry: {
    main: path.resolve(__dirname, '../page/index.tsx'),
  },
  output: {
    filename: '[name][chunkhash:4].js',
    chunkFilename: '[name][chunkhash:4].js',
    publicPath: './',
    // path: path.resolve(__dirname, '../dist'),
    clean: true, // webpack5 替代CleanWebpackPlugin
  },
  resolve: {
    // what directories should be searched when resolving modules.
    // absolute path will only search in the given directory.
    modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../utils'), // 要绝对路径
      'coms': path.resolve(__dirname, '../common/components'),
      'style': path.resolve(__dirname, '../common/style'),
      'assets': path.resolve(__dirname, '../common/assets'),
      'i18n': path.resolve(__dirname, '../i18n'),
    },
  },
  module: {
    rules: [
      // css 根据文件名开启css modules
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        sideEffects: true,
      },
      {
        test: /\.less$/i,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // modules: 'global',
              modules: {
                // auto: (src) => {
                //   console.log(src, '===src');
                // },
                auto: /(page(\\|\/).*)|(common(\\|\/)components(\\|\/).*)/, // page 目录开启css modules
                localIdentName: '[folder]-[local]-[hash:base64:3]', // path/name/local/hash
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true, // 3.11.1 后lessOptions.javascriptEnabled
              },
            },
          },
        ],
        // sideEffects: true,
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   dependency: { not: ['url'] },
      //   // loader: 'file-loader',
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       limit: 8124,
      //     },
      //   },
      //   type: 'javascript/auto', // webpack5 stop Asset Module
      // },
      {
        test: /\.(png|jpg|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
        generator: {
          filename: 'static/[hash:4][ext][query]', // 图片文件位置/文件名
        },
      },
      {
        test: /\.svg/i,
        type: 'asset/resource',
      },
      {
        test: /\.txt$/,
        type: 'asset/source', // 原样输出
      },
    ],
  },
  plugins: [
    new webpackbar(),
    // new webpack.ProvidePlugin({
    //   React: 'react',
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // 命令是在根目录执行
    new CopyWebpackPlugin({
      patterns: [
        { from: './public', to: './static' },
      ],
    }),
    new Plugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, '../page/index.html'), // 不给模板它自己会创建一个html模板
    }),
    // new webpack.IgnorePlugin({
    //   resourceRegExp: /^\.\/locale$/,
    //   contextRegExp: /moment$/,
    // }),
  ],
  optimization: {
    usedExports: true,
  },
};
