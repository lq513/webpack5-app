const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../page/index.tsx'),
  output: {
    filename: 'ab[id].js',
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
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 编译es6语法 && 编译react
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: /node_modules/,
      },
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
        use: [{
          loader: 'style-loader',
          options: {
            'injectType': 'lazyStyleTag',
          },
        }, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
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
