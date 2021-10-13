const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
    filename: 'ab[hash][id].js',
    chunkFilename: 'bundle[name][hash],js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../utils'), // 要绝对路径
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        // use: 'awesome-typescript-loader',
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.jsx?$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       // 编译es6语法 && 编译react
      //       presets: ['@babel/preset-env', '@babel/preset-react'],
      //     },
      //   },
      //   exclude: /node_modules/,
      // },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
          options: {
            'injectType': 'lazyStyleTag',
          },
        }, 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     'injectType': 'lazyStyleTag',
          //   },
          // },
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // 对所有文件启用 CSS 模块
              // url: {
              //   filter: (url, resourcePath) => {
              //     // resourcePath - path to css file
              //     console.log(url, resourcePath, 111111, 'css-loader\n');
    
              //     // Don't handle `a.jpg` urls
              //     if (url.includes('a.jpg')) {
              //       return false;
              //     }
    
              //     return true;
              //   },
              // },
            },
          },
          'less-loader',
        ],
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
        test: /\.(png|jpg|git$)/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // new CopyWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, '../page/index.html'), // 不给模板它自己会创建一个html模板
    }),
  ],
};
